import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { PaginationParams } from "src/core/repositories/pagination-params.contract"
import { User } from "src/modules/user/domain/enterprise/user.entity"
import { Repository } from "typeorm"
import { UserModel } from "../models/user.model"
import { IUserRepository } from "src/modules/user/domain/application/repositories/user.repository.contract"

export class TypeOrmUserRepositoryImpl implements IUserRepository {

  constructor(@InjectRepository(UserModel) private repository : Repository<UserModel>){}

  findById(id: string): Promise<User> {
    throw new Error("Method not implemented.")

  }

  create(data: User): Promise<void> {
    throw new Error("Method not implemented.")
  }
  save(data: User): Promise<void> {
    throw new Error("Method not implemented.")
  }
  async findAll(page: PaginationParams): Promise<User[]> {
     const userModel = await this.repository.find()
    return userModel.map(user =>  User.instance(user))
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.")
  }

}