import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/ports/user-repository.port';
import { Prisma } from 'generated/prisma';
import { DefaultArgs } from 'generated/prisma/runtime/library';
import { IUser } from 'src/user/domain/entities/user.entity';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  get(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect<DefaultArgs>;
    include?: Prisma.UserInclude<DefaultArgs>;
  }): Promise<IUser> {
    const { where, select, include } = params;
    return this.prisma.user.findUnique({
      where,
      ...(select ? { select } : include ? { include } : {}),
    });
  }
  async delete(params: { where: Prisma.UserWhereUniqueInput }): Promise<void> {
    const { where } = params;
    await this.prisma.user.delete({
      where,
    });
  }
  save(params: {
    data: Prisma.UserUncheckedCreateInput;
    select?: Prisma.UserSelect<DefaultArgs>;
    include?: Prisma.UserInclude<DefaultArgs>;
  }): Promise<IUser> {
    const { data, select, include } = params;
    return this.prisma.user.create({
      data,
      ...(select ? { select } : include ? { include } : {}),
    });
  }
  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
    select?: Prisma.UserSelect<DefaultArgs>;
    include?: Prisma.UserInclude<DefaultArgs>;
  }): Promise<IUser> {
    const { where, data, select, include } = params;
    return this.prisma.user.update({
      where,
      data,
      ...(select ? { select } : include ? { include } : {}),
    });
  }
  getAll(params: {
    select?: Prisma.UserSelect<DefaultArgs>;
    include?: Prisma.UserInclude<DefaultArgs>;
  }): Promise<IUser[]> {
    const { select, include } = params;
    return this.prisma.user.findMany({
      ...(select ? { select } : {}),
    });
  }
}
