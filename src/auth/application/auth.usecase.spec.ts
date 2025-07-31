import { AuthUseCase } from './auth.usecase';
import { IRefreshSessionRepository } from '../domain/ports/refresh-session-repository.port';
import { IUserService } from '../../user/domain/ports/user-service.port';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../../user/domain/entities/user.entity';
import { IClientMetadata } from '@app/decorators';
import { IRefreshSession } from '../domain/entities/refresh-session.entity';

describe('AuthUseCase', () => {
  let useCase: AuthUseCase;
  let mockRepository: jest.Mocked<IRefreshSessionRepository>;
  let mockUserUseCase: jest.Mocked<IUserService>;
  let mockJwtService: jest.Mocked<JwtService>;
  let mockConfigService: jest.Mocked<ConfigService>;

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
      verify: jest.fn(),
      decode: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    mockConfigService = {
      get: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>;

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
    const expiresIn = 12345;
    mockConfigService.get.mockReturnValue(expiresIn);

    const createdRefreshSession: IRefreshSession = {
      id: 1,
      ua: clientData.userAgent,
      fingerprint,
      ip: clientData.ip,
      refreshToken: 'uuid',
      expiresIn,
      userId: created.id,
    };

    mockJwtService.sign.mockReturnValue('access_token');
    mockRepository.save.mockResolvedValue(createdRefreshSession);

    const result = await useCase.signUp(input, clientData, res, fingerprint);

    expect(mockUserUseCase.createUser).toHaveBeenCalledWith(input);

    expect(mockJwtService.sign).toHaveBeenCalledWith(
      {
        sub: created.id,
        role: created.role,
      },
      expect.any(Object),
    );

    expect(result).toEqual({
      accessToken: 'access_token',
      refreshToken: 'uuid',
    });
  });
});
