import { AuthUseCase } from './auth.usecase';
import { IRefreshSessionRepository } from '../domain/ports/refresh-session-repository.port';
import { IUserService } from '../../user/domain/ports/user-service.port';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../../user/domain/entities/user.entity';
import { IClientMetadata } from '@app/decorators';

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
    let clientData: IClientMetadata;
  });
});
