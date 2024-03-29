import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "./models/user.model";
import { TypeOrmUserRepositoryImpl } from "./repositories/typeorm-user-repository.impl";
import { IUserRepository } from "src/modules/user/domain/application/repositories/user.repository.contract";

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [TypeOrmUserRepositoryImpl,
  {
    provide: IUserRepository,
    useClass: TypeOrmUserRepositoryImpl
  }],
  exports: [TypeOrmUserRepositoryImpl],
})
export class PersistenceUserModule {}
