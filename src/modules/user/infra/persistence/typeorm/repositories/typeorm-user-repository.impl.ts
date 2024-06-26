import { InjectRepository } from '@nestjs/typeorm';
import { PaginationParams } from 'src/core/repositories/pagination-params.contract';
import { User } from 'src/modules/user/domain/enterprise/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from 'src/modules/user/domain/application/repositories/user.repository.contract';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { UserVo } from 'src/modules/user/domain/enterprise/value-objects/user-vo';
import { UserModel } from '../models/user.entity';

export class TypeOrmUserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserModel) private repository: Repository<UserModel>,
  ) {}

  async listAll(): Promise<UserVo[]> {
    const users = await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return users.map((user) =>
      UserVo.instance({
        name: user.name,
        email: user.email,
        surname: user.surname,
        userId: new UniqueEntityID(user.id),
        accessLevel: user.accessLevel,
        isActive: user.isActive,
        createdAt: user.createdAt,
      }),
    );
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!user) return null;

    return User.instance(
      {
        name: user.name,
        surname: user.surname,
        email: user.email,
        accessLevel: user.accessLevel,
        password: user.password,
      },
      new UniqueEntityID(user.id),
    );
  }

  async create(data: User): Promise<void> {
    await this.repository.save({
      id: data.id.toValue(),
      name: data.name,
      surname: data.surname,
      email: data.email,
      accessLevel: data.accessLevel,
      isActive: data.isActive,
      createdAt: new Date(),
      password: data.password,
    });
  }
  async save(data: User): Promise<void> {
    await this.repository.update(data.id.toValue(), {
      name: data.name,
      surname: data.surname,
      accessLevel: data.accessLevel,
      isActive: data.isActive,
    });
  }
  async findAll(page: PaginationParams): Promise<User[]> {
    const userModel = await this.repository.find();
    return userModel.map((user) =>
      User.instance(
        {
          name: user.name,
          surname: user.surname,
          email: user.email,
          accessLevel: user.accessLevel,
          password: user.password,
        },
        new UniqueEntityID(user.id),
      ),
    );
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
        isActive: true,
      },
    });

    if (!user) return null;

    return User.instance(
      {
        name: user.name,
        surname: user.surname,
        email: user.email,
        accessLevel: user.accessLevel,
        password: user.password,
      },
      new UniqueEntityID(user.id),
    );
  }
}
