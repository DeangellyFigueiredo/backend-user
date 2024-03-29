import { Either, success } from 'src/core/types/either';
import { EAccessLevel, User } from '../../enterprise/user.entity';
import { EmailAlreadyRegisteredError } from './erros/email-already-registered-error';
import { IUserRepository } from '../repositories/user.repository.contract';

interface CreateUserUseCaseRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  accessLevel: EAccessLevel;
}

type CreateUserUseCaseResponse = Either<EmailAlreadyRegisteredError, {
  message : string
}>;

export class CreateUserUseCase {

  constructor(   
     private userRepositor: IUserRepository
    ){
  }

  async execute({
    name,
    surname,
    email,
    password,
    accessLevel,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = User.instance({
      name,
      surname,
      email,
      password,
      accessLevel,
    });

    const createUser = await this.userRepositor.create(user);


     return success({
      message: 'User created successfully',
     });
  }
}