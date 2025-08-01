import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthUseCase } from './auth.usecase';
import { IRefreshSessionRepository } from '../domain/ports/refresh-session-repository.port';
import { IUserService } from '../../user/domain/ports/user-service.port';
import { IUser } from '../../user/domain/entities/user.entity';
import { IClientMetadata } from '@app/decorators';
import { IRefreshSession } from '../domain/entities/refresh-session.entity';

describe('AuthUseCase', () => {
  let useCase: AuthUseCase;
  let mockRepository: jest.Mocked<IRefreshSessionRepository>;
  let mockUserUseCase: jest.Mocked<IUserService>;
  let mockJwtService: jest.Mocked<JwtService>;
  let mockConfigService: jest.Mocked<ConfigService>;
  let expiresIn: number;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      update: jest.fn(),
    };

    mockUserUseCase = {
      createUser: jest.fn(),
      getUserByUsername: jest.fn(),
      getUserById: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };

    mockJwtService = {
      sign: jest.fn(),
      signAsync: jest.fn(),
      verify: jest.fn(),
      decode: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    mockConfigService = {
      get: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>;

    mockConfigService.get.mockReturnValue('15d');
    useCase = new AuthUseCase(
      mockUserUseCase,
      mockRepository,
      mockJwtService,
      mockConfigService,
    );
  });

  it('should sign up user', async () => {
    const input: IUser = { username: 'Artem', password: '1234567' };
    const created: IUser = { id: 1, ...input, role: 'Reviewer' };
    mockUserUseCase.createUser.mockResolvedValue(created);

    const fingerprint = 'rfrfrfrfrfrrfr';
    const clientData: IClientMetadata = {
      userAgent: 'Chrome',
      ip: '127.0.0.1',
    };

    const createdRefreshSession: IRefreshSession = {
      id: 1,
      ua: clientData.userAgent,
      fingerprint,
      ip: clientData.ip,
      refreshToken: 'uuid',
      expiresIn,
      userId: created.id,
    };

    mockJwtService.signAsync.mockResolvedValue('access_token');
    mockRepository.save.mockResolvedValue(createdRefreshSession);

    const result = await useCase.signUp(input, clientData, fingerprint);

    expect(mockUserUseCase.createUser).toHaveBeenCalledWith(input);

    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      sub: created.id,
      role: created.role,
    });

    expect(result).toEqual({
      accessToken: 'access_token',
      refreshToken: 'uuid',
    });
  });

  it('should sign in user', async () => {
    const input: IUser = {
      id: 1,
      username: 'Test Username',
      password: 'Hash Password',
      role: 'Reviewer',
    };
    const clientData: IClientMetadata = {
      userAgent: 'Firefox',
      ip: '::1',
    };
    const fingerprint: string = 'ewfwefewfwefwefw';

    const createdRefreshSession: IRefreshSession = {
      id: 1,
      refreshToken: 'uuid',
      ua: clientData.userAgent,
      fingerprint,
      ip: clientData.ip,
      userId: input.id,
      expiresIn,
    };

    const sessions: IRefreshSession[] = [];
    mockRepository.getAll.mockResolvedValue(sessions);
    mockRepository.save.mockResolvedValue(createdRefreshSession);
    mockJwtService.signAsync.mockResolvedValue('access_token');

    const result = await useCase.checkPassword(input, clientData, fingerprint);

    expect(mockRepository.getAll).toHaveBeenCalledWith({
      where: { userId: input.id },
    });

    expect(mockRepository.get).toHaveBeenCalledWith({
      where: {
        userId_ip_ua_fingerprint: {
          userId: input.id,
          ua: clientData.userAgent,
          ip: clientData.ip,
          fingerprint,
        },
      },
    });

    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      sub: input.id,
      role: input.role,
    });

    expect(result).toEqual({
      accessToken: 'access_token',
      refreshToken: 'uuid',
    });
  });

  it('should validate user if password matches', async () => {
    const user = {
      id: 1,
      username: 'True Username',
      password: 'Hashed Password',
      role: 'Reviewer',
    } as IUser;

    mockUserUseCase.getUserByUsername.mockResolvedValue(user);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));

    const result = await useCase.validateUser('True Username', '1234567');

    expect(mockUserUseCase.getUserByUsername).toHaveBeenCalledWith(
      'True Username',
    );
    expect(result).toEqual(user);
  });

  it('should validate user if password do not match', async () => {
    const user = {
      id: 1,
      username: 'True Username',
      password: 'True Password',
      role: 'Reviewer',
    } as IUser;

    mockUserUseCase.getUserByUsername.mockResolvedValue(user);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(false));

    const result = await useCase.validateUser(
      'True Username',
      'Not True Password',
    );

    expect(mockUserUseCase.getUserByUsername).toHaveBeenCalledWith(
      'True Username',
    );
    expect(result).toBeNull();
  });

  it('should refresh tokens', async () => {
    const refreshTokenFromCookies = 'true uuid';
    const clientData: IClientMetadata = { userAgent: 'Yandex', ip: '::1' };
    const fingerprint: string = 'ewfwefewfwefwefw';

    const existsRefreshSession: IRefreshSession = {
      id: 1,
      refreshToken: 'true uuid',
      ua: clientData.userAgent,
      fingerprint,
      ip: clientData.ip,
      userId: 1,
      expiresIn,
    };

    const user: IUser = {
      id: 1,
      username: 'True Username',
      password: 'Hashed Password',
      role: 'Reviewer',
    };

    const newRefreshSession = {
      ...existsRefreshSession,
      id: 2,
      refreshToken: 'new uuid',
    };

    mockRepository.get.mockResolvedValue(existsRefreshSession);
    mockRepository.delete.mockResolvedValue(undefined);
    mockUserUseCase.getUserById.mockResolvedValue(user);
    mockRepository.save.mockResolvedValue(newRefreshSession);
    mockJwtService.signAsync.mockResolvedValue('access_token');

    const result = await useCase.refreshTokens(
      {
        refreshToken: refreshTokenFromCookies,
      },
      clientData,
      fingerprint,
    );

    expect(mockRepository.get).toHaveBeenCalledWith({
      where: {
        refreshToken: refreshTokenFromCookies,
      },
    });

    expect(mockRepository.delete).toHaveBeenCalled();

    expect(result).toEqual({
      accessToken: 'access_token',
      refreshToken: 'new uuid',
    });
  });

  it('should logged out', async () => {
    const refreshTokenFromCookies = 'true uuid';

    mockRepository.delete.mockResolvedValue(undefined);

    const result = await useCase.logout({
      refreshToken: refreshTokenFromCookies,
    });

    expect(mockRepository.delete).toHaveBeenCalledWith({
      where: {
        refreshToken: refreshTokenFromCookies,
      },
    });
    expect(result).toEqual({ message: 'Successfully logged out' });
  });
});
