import { IBaseRepository } from 'src/core/repositories/base-repository.contract';
import { PaginationParams } from 'src/core/repositories/pagination-params.contract';
import { UserVo } from '../../enterprise/value-objects/user-vo';
import { User } from '../../enterprise/user.entity';

export abstract class IUserRepository extends IBaseRepository<User> {
  abstract listAll(page: PaginationParams): Promise<UserVo[]>;
}
