import { Injectable } from '@nestjs/common';
import { IRepository } from '@app/interfaces';
import { IReview } from './interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewRepository implements IRepository<IReview> {
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
