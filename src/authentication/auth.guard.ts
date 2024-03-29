import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { ROLES_KEY } from './decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic || process.env.MOCK_SERVER === 'true') return true;
    const request = context.switchToHttp().getRequest<Request>();
    const headers = request.headers as any;

    if (!headers.authorization) {
      throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);
    }
    const extractJwt = headers.authorization;
    if (!extractJwt) {
      throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);
    }
    await this.authService.authenticate(extractJwt);

    const user = await this.authService.decodeJWT(extractJwt);

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    if (!requiredRoles.some((role) => user.permissions?.includes(role))) {
      throw new HttpException(
        'Usuário não tem permissão para acessar este recurso',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return requiredRoles.some((role) => user.permissions?.includes(role));
  }
}
