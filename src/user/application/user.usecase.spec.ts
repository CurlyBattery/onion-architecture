import { IUserRepository } from '../domain/ports/user-repository.port';
import { IUser } from '../domain/entities/user.entity';
import { UserUseCase } from './user.usecase';

describe('UserUseCase', () => {
  let useCase: UserUseCase;
  let mockRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    };

    useCase = new UserUseCase(mockRepository);
  });

  it('should create a user', async () => {
    const input: IUser = { username: 'Test', password: 'Some content' };
    const created: IUser = { id: 1, ...input, role: 'Reviewer' };

    mockRepository.save.mockResolvedValue(created);

    const result = await useCase.createUser(input);

    expect(result).toEqual(created);
    expect(mockRepository.save).toHaveBeenCalledWith({ data: input });
  });

  it('should get user by id', async () => {
    const user: IUser = {
      id: 1,
      username: 'Username',
      password: 'Password',
      role: 'Reviewer',
    };

    mockRepository.get.mockResolvedValue(user);

    const result = await useCase.getUserById(1);

    expect(result).toEqual(user);
    expect(mockRepository.get).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should get user by username', async () => {
    const user: IUser = {
      id: 1,
      username: 'Username',
      password: 'Password',
      role: 'Reviewer',
    };

    mockRepository.get.mockResolvedValue(user);

    const result = await useCase.getUserByUsername('Username');

    expect(result).toEqual(user);
    expect(mockRepository.get).toHaveBeenCalledWith({
      where: { username: 'Username' },
    });
  });

  it('should delete a user', async () => {
    const user: IUser = {
      id: 1,
      username: 'Username',
      password: 'Password',
      role: 'Reviewer',
    };
    mockRepository.get.mockResolvedValue(user);

    mockRepository.delete.mockResolvedValue(undefined);

    const result = await useCase.deleteUser(1);

    expect(result).toEqual({ message: 'Successfully deleted user' });
    expect(mockRepository.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a user', async () => {
    const existsUser: IUser = {
      id: 1,
      username: 'Old Username',
      password: 'Password',
      role: 'Reviewer',
    };

    const updated: IUser = {
      id: 1,
      username: 'Updated Username',
      password: 'Password',
      role: 'Reviewer',
    };

    mockRepository.get.mockResolvedValueOnce(existsUser);

    mockRepository.get.mockResolvedValueOnce(undefined);

    mockRepository.update.mockResolvedValue(updated);

    const result = await useCase.updateUser(1, {
      username: 'Updated Username',
    });

    expect(result).toEqual(updated);
    expect(mockRepository.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        username: 'Updated Username',
      },
    });
  });
});
