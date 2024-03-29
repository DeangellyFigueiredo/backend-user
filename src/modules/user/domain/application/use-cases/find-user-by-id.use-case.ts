import { Either, failure, success } from 'src/core/types/either';
import { IUserRepository } from '../repositories/user.repository.contract';
import { User } from '../../enterprise/user.entity';

interface FindUserByIdCaseRequest {
  id: string;
}

type FindUserByIdCaseResponse = Either<
  null,
  {
    user: User;
  }
>;

export class FindUserByIdUseCase {
  constructor(private userRepositor: IUserRepository) {}

  async execute({
    id,
  }: FindUserByIdCaseRequest): Promise<FindUserByIdCaseResponse> {
    const user = await this.userRepositor.findById(id);

    if (!user) {
      return failure(null);
    }

    return success({
      user,
    });
  }
}
