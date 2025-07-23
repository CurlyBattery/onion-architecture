import { Injectable } from '@nestjs/common';

import { IReviewRepository } from '../../domain/ports/review-repository.port';
import { PrismaService } from '../../../prisma/prisma.service';
import { IReview } from '../../domain/entities/review.entity';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  get(id: number): Promise<IReview> {
    return this.prisma.review.findUnique({
      where: { id },
    });
  }
  async delete(id: number): Promise<void> {
    await this.prisma.review.delete({
      where: { id },
    });
  }
  save(input: IReview): Promise<IReview> {
    return this.prisma.review.create({
      data: input,
    });
  }
  update(id: number, input: Partial<IReview>): Promise<IReview> {
    return this.prisma.review.update({
      where: { id },
      data: input,
    });
  }
  getAll(): Promise<IReview[]> {
    return this.prisma.review.findMany();
  }
}
