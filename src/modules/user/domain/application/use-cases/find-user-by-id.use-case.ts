import { Either, failure, success } from 'src/core/types/either';
import { IUserRepository } from '../repositories/user.repository.contract';
import { User } from '../../enterprise/user.entity';
import { UserNotFoundError } from './erros/user-not-found.error';
import { InvalidTypeUUIDError } from './erros/invalid-type-uuid.error';

interface FindUserByIdCaseRequest {
  id: string;
}

type FindUserByIdCaseResponse = Either<
  UserNotFoundError | InvalidTypeUUIDError,
  {
    user: User;
  }
>;

export class FindUserByIdUseCase {
  constructor(private userRepositor: IUserRepository) {}

  async execute({
    id,
  }: FindUserByIdCaseRequest): Promise<FindUserByIdCaseResponse> {
    let user;
    try {
      user = await this.userRepositor.findById(id);
    } catch (err) {
      return failure(new InvalidTypeUUIDError());
    }

    if (!user) {
      return failure(new UserNotFoundError());
    }

    return success({
      user,
    });
  }
}
