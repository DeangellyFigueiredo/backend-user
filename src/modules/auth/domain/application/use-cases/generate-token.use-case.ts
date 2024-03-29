import { JwtService } from '@nestjs/jwt';
import { Either, failure, success } from 'src/core/types/either';
import { SetPermissionsUseCase } from './set-permissions.use-case';
import { EAccessLevel } from 'src/modules/user/domain/enterprise/user.entity';
import { RoleNotAuthorizedError } from './errors/role-not-authorized-error';

interface GenerateTokenUseCaseRequest {
  expireToken: number;
  user: {
    sub: string;
    role: EAccessLevel;
  };
}

type GenerateTokenUseCaseResponse = Either<
  RoleNotAuthorizedError,
  {
    access_token: string;
  }
>;

export class GenerateTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly setPermissionsUseCase: SetPermissionsUseCase,
  ) {}
  async execute({
    expireToken,
    user,
  }: GenerateTokenUseCaseRequest): Promise<GenerateTokenUseCaseResponse> {
    const permissionsResult = await this.setPermissionsUseCase.execute({
      role: user.role,
    });

    if (permissionsResult.isFailure()) {
      return failure(new RoleNotAuthorizedError());
    }

    const token = this.jwtService.sign(
      { sub: user, permissions: permissionsResult.value.permissions },
      {
        expiresIn: expireToken,
        secret: process.env.SECRET_KEY_ACCESS_TOKEN,
      },
    );

    return success({ access_token: token });
  }
}
