import { Either, success } from 'src/core/types/either';
import { EAccessLevel, User } from '../../enterprise/user.entity';
import { EmailAlreadyRegisteredError } from './erros/email-already-registered-error';
import { IUserRepository } from '../repositories/user.repository.contract';

interface GetUserAllUserCaseRequest {
  page : number;
}

type GetUserAllUserCaseResponse = Either<null, {
  user : User[]
}>;

export class GetAllUserUseCase {

  constructor(   
     private userRepositor: IUserRepository
    ){
  }

  async execute({page} : GetUserAllUserCaseRequest): Promise<GetUserAllUserCaseResponse> {
    

    const getUserAll = await this.userRepositor.findAll({page});


     return success({
      user: getUserAll,
     });
  }
}
