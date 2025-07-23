import { Injectable } from '@nestjs/common';

import { IReviewRepository } from '../../domain/ports/review-repository.port';
import { PrismaService } from '../../../prisma/prisma.service';
import { IReview } from '../../domain/entities/review.entity';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  get(id: number): Promise<IReview> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): void {
    throw new Error('Method not implemented.');
  }
  save(input: IReview): Promise<IReview> {
    return this.prisma.review.create({
      data: input,
    });
  }
  update(input: IReview): Promise<IReview> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<IReview[]> {
    return this.prisma.review.findMany();
  }
}
