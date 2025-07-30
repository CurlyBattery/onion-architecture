import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IClientMetadata {
  ip: string;
  userAgent: string;
}

export const ClientMetadata = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IClientMetadata => {
    const request = ctx.switchToHttp().getRequest();
    return {
      ip: request.ip,
      userAgent: request.headers['user-agent'],
    };
  },
);
