import { Either, failure, success } from 'src/core/types/either';
import { EAccessLevel, User } from '../../enterprise/user.entity';
import { IUserRepository } from '../repositories/user.repository.contract';
import { UserNotFoundError } from './erros/user-not-found.error';
import { FindUserByIdUseCase } from './find-user-by-id.use-case';
import { InvalidTypeUUIDError } from './erros/invalid-type-uuid.error';

interface UpdateUserUseCaseRequest {
  id: string;
  name: string;
  surname: string;
  accessLevel: EAccessLevel;
}

type UpdateUserUseCaseResponse = Either<
  UserNotFoundError | InvalidTypeUUIDError,
  {
    message: string;
  }
>;

export class UpdateUserUseCase {
  constructor(
    private readonly userRepositor: IUserRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute({
    id,
    name,
    surname,
    accessLevel,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.findUserByIdUseCase.execute({ id });
    if (user.isFailure()) {
      return failure(user.value);
    }

    user.value.user.name = name;
    user.value.user.surname = surname;
    user.value.user.accessLevel = accessLevel;

    await this.userRepositor.save(user.value.user);

    return success({
      message: 'User updated successfully',
    });
  }
}
