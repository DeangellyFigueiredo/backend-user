import { Module } from '@nestjs/common';
import { PersistenceUserModule } from '../persistence/typeorm/persistence-user.module';
import { UserController } from './controllers/user.controller';
import { GetAllUserUseCase } from '../../domain/application/use-cases/get-all-user.use-case';
import { TypeOrmUserRepositoryImpl } from '../persistence/typeorm/repositories/typeorm-user-repository.impl';
import { CreateUserUseCase } from '../../domain/application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../../domain/application/use-cases/delete-user.use-case';
import { FindUserByIdUseCase } from '../../domain/application/use-cases/find-user-by-id.use-case';

@Module({
  imports: [PersistenceUserModule],
  controllers: [UserController],
  providers: [
    {
      provide: GetAllUserUseCase,
      useFactory: (userRepository: TypeOrmUserRepositoryImpl) =>
        new GetAllUserUseCase(userRepository),
      inject: [TypeOrmUserRepositoryImpl],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: TypeOrmUserRepositoryImpl) =>
        new CreateUserUseCase(userRepository),
      inject: [TypeOrmUserRepositoryImpl],
    },
    {
      provide: FindUserByIdUseCase,
      useFactory: (userRepository: TypeOrmUserRepositoryImpl) =>
        new FindUserByIdUseCase(userRepository),
      inject: [TypeOrmUserRepositoryImpl],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (
        userRepository: TypeOrmUserRepositoryImpl,
        findUserByIdUseCase: FindUserByIdUseCase,
      ) => new DeleteUserUseCase(userRepository, findUserByIdUseCase),
      inject: [TypeOrmUserRepositoryImpl, FindUserByIdUseCase],
    },
  ],
})
export class HttpUserModule {}
