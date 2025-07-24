import { ConflictException } from '@nestjs/common';

export class ReviewConflictException extends ConflictException {
  constructor() {
    super('Review already exists');
  }
}
