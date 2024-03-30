import { IBaseRepository } from 'src/core/repositories/base-repository.contract';
import { UserVo } from '../../enterprise/value-objects/user-vo';
import { User } from '../../enterprise/user.entity';

export abstract class IUserRepository extends IBaseRepository<User> {
  abstract listAll(): Promise<UserVo[]>;
  abstract findByEmail(email: string): Promise<User>;
}
