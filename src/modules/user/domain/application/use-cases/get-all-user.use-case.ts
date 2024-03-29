import { Either, success } from 'src/core/types/either';
import { IUserRepository } from '../repositories/user.repository.contract';
import { UserVo } from '../../enterprise/value-objects/user-vo';

interface GetUserAllUserCaseRequest {
  page: number;
}

type GetUserAllUserCaseResponse = Either<
  null,
  {
    users: UserVo[];
  }
>;

export class GetAllUserUseCase {
  constructor(private readonly userRepositor: IUserRepository) {}

  async execute({
    page,
  }: GetUserAllUserCaseRequest): Promise<GetUserAllUserCaseResponse> {
    const users = await this.userRepositor.listAll({ page });
    console.log(users);
    return success({
      users,
    });
  }
}
