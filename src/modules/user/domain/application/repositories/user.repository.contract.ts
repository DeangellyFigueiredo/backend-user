import { IBaseRepository } from "src/core/repositories/base-repository.contract";
import { User } from "../../enterprise/user.entity";

export abstract class IUserRepository extends IBaseRepository<User>{
}