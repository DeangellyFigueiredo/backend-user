import { Either, failure, success } from 'src/core/types/either';
import { RoleNotAuthorizedError } from './errors/role-not-authorized-error';
import { EAccessLevel } from 'src/modules/user/domain/enterprise/user.entity';

interface SetPermissionsUseCaseRequest {
  role: EAccessLevel;
}

type SetPermissionsUseCaseResponse = Either<
  RoleNotAuthorizedError,
  {
    permissions: string[];
  }
>;

export class SetPermissionsUseCase {
  async execute({
    role,
  }: SetPermissionsUseCaseRequest): Promise<SetPermissionsUseCaseResponse> {
    if (!role) return failure(new RoleNotAuthorizedError());
    if (role === EAccessLevel.ADMIN)
      return success({
        permissions: [
          'create-users',
          'list-users',
          'delete-users',
          'update-users',
          'graph-users',
        ],
      });

    if (role === EAccessLevel.COMMON || role === EAccessLevel.GUEST)
      return success({
        permissions: ['list-users'],
      });
  }
}
