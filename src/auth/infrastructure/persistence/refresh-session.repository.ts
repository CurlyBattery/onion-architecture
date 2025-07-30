import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { IRefreshSessionRepository } from '../../domain/ports/refresh-session-repository.port';
import { Prisma } from 'generated/prisma';
import { DefaultArgs } from 'generated/prisma/runtime/library';
import { IRefreshSession } from 'src/auth/domain/entities/refresh-session.entity';

@Injectable()
export class RefreshSessionRepository implements IRefreshSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  get(params: {
    where: Prisma.RefreshSessionWhereUniqueInput;
    select?: Prisma.RefreshSessionSelect<DefaultArgs>;
    include?: Prisma.RefreshSessionInclude<DefaultArgs>;
  }): Promise<IRefreshSession> {
    const { where, select, include } = params;
    return this.prisma.refreshSession.findUnique({
      where,
      ...(select ? { select } : include ? { include } : {}),
    });
  }
  async delete(params: {
    where: Prisma.RefreshSessionWhereUniqueInput;
  }): Promise<void> {
    const { where } = params;
    await this.prisma.refreshSession.delete({
      where,
    });
  }
  async deleteMany(params: {
    where: Prisma.RefreshSessionWhereInput;
  }): Promise<void> {
    const { where } = params;
    await this.prisma.refreshSession.deleteMany({
      where,
    });
  }
  save(params: {
    data: Prisma.RefreshSessionUncheckedCreateInput;
    select?: Prisma.RefreshSessionSelect<DefaultArgs>;
    include?: Prisma.RefreshSessionInclude<DefaultArgs>;
  }): Promise<IRefreshSession> {
    const { data, select, include } = params;
    return this.prisma.refreshSession.create({
      data,
      ...(select ? { select } : include ? { include } : {}),
    });
  }
  update(params: {
    where: Prisma.RefreshSessionWhereUniqueInput;
    data: Prisma.RefreshSessionUpdateInput;
    select?: Prisma.RefreshSessionSelect<DefaultArgs>;
    include?: Prisma.RefreshSessionInclude<DefaultArgs>;
  }): Promise<IRefreshSession> {
    const { where, data, select, include } = params;
    return this.prisma.refreshSession.update({
      where,
      data,
      ...(select ? { select } : include ? { include } : {}),
    });
  }
  getAll(params: {
    where?: Prisma.RefreshSessionWhereInput;
    select?: Prisma.RefreshSessionSelect<DefaultArgs>;
    include?: Prisma.RefreshSessionInclude<DefaultArgs>;
  }): Promise<IRefreshSession[]> {
    const { where, select, include } = params;
    return this.prisma.refreshSession.findMany({
      ...(where ? { where } : {}),
      ...(select ? { select } : {}),
      ...(include ? { include } : {}),
    });
  }
}
