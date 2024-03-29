import { Either, failure, success } from 'src/core/types/either';
import { IUserRepository } from '../repositories/user.repository.contract';
import { User } from '../../enterprise/user.entity';
import { UserNotFoundError } from './erros/user-not-found.error';
import { InvalidTypeUUIDError } from './erros/invalid-type-uuid.error';

interface FindUserByEmailCaseRequest {
  email: string;
}

type FindUserByEmailCaseResponse = Either<
  UserNotFoundError,
  {
    user: User;
  }
>;

export class FindUserByEmailUseCase {
  constructor(private userRepositor: IUserRepository) {}

  async execute({
    email,
  }: FindUserByEmailCaseRequest): Promise<FindUserByEmailCaseResponse> {
    const user = await this.userRepositor.findByEmail(email);

    if (!user) {
      return failure(new UserNotFoundError());
    }

    return success({
      user,
    });
  }
}
