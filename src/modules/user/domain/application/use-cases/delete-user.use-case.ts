import { Either, failure, success } from 'src/core/types/either';
import { IUserRepository } from '../repositories/user.repository.contract';
import { UserNotFoundError } from './erros/user-not-found.error';
import { FindUserByIdUseCase } from './find-user-by-id.use-case';

interface DeleteUserUseCaseRequest {
  id: string;
}

type DeleteUserUseCaseResponse = Either<
  UserNotFoundError,
  {
    message: string;
  }
>;

export class DeleteUserUseCase {
  constructor(
    private readonly userRepositor: IUserRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    console.log(id);
    const user = await this.findUserByIdUseCase.execute({ id });

    if (user.isFailure()) {
      return failure(user.value);
    }

    await this.userRepositor.delete(id);

    return success({
      message: 'User Deleted successfully',
    });
  }
}
