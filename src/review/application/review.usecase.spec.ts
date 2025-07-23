import { ReviewUseCase } from './review.usecase';
import { IReviewRepository } from '../domain/ports/review-repository.port';
import { IReview } from '../domain/entities/review.entity';

describe('ReviewUseCase', () => {
  let useCase: ReviewUseCase;
  let mockRepository: jest.Mocked<IReviewRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new ReviewUseCase(mockRepository);
  });

  it('should create a review', async () => {
    const input: IReview = { title: 'Test', content: 'Some content' };
    const created: IReview = { id: 1, ...input };

    mockRepository.save.mockResolvedValue(created);

    const result = await useCase.createReview(input);

    expect(result).toEqual(created);
    expect(mockRepository.save).toHaveBeenCalledWith(input);
  });

  it('should get all reviews', async () => {
    const reviews: IReview[] = [{ id: 1, title: 'Test', content: 'Test' }];
    mockRepository.getAll.mockResolvedValue(reviews);

    const result = await useCase.getReviews();

    expect(result).toEqual(reviews);
    expect(mockRepository.getAll).toHaveBeenCalled();
  });

  it('should get review by id', async () => {
    const review: IReview = { id: 1, title: 'Title', content: 'Text' };
    mockRepository.get.mockResolvedValue(review);

    const result = await useCase.getReviewById(1);

    expect(result).toEqual(review);
    expect(mockRepository.get).toHaveBeenCalledWith(1);
  });

  it('should delete a review', async () => {
    mockRepository.delete.mockResolvedValue(undefined);

    const result = await useCase.deleteReview(1);

    expect(result).toEqual({ message: 'Successfully deleted review' });
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should update a review', async () => {
    const updated: IReview = {
      id: 1,
      title: 'Updated',
      content: 'Updated content',
    };

    mockRepository.update.mockResolvedValue(updated);

    const result = await useCase.updateReview(1, {
      title: 'Updated',
      content: 'Updated content',
    });

    expect(result).toEqual(updated);
    expect(mockRepository.update).toHaveBeenCalledWith(1, {
      title: 'Updated',
      content: 'Updated content',
    });
  });
});
