import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { UniqueEntityID } from './../core/entities/unique-entity-id';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { UserModel } from './../modules/user/infra/persistence/typeorm/models/user.entity';

export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(UserModel);
    console.log('Seeding users...');
    for (let i = 0; i < 10; i++) {
      await userRepository.insert({
        id: new UniqueEntityID().toString(),
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        password: await bcrypt.hash('123456', 10),
        accessLevel: faker.number.int({ min: 1, max: 3 }),
        createdAt: new Date(),
        isActive: faker.datatype.boolean(),
      });
    }

    const admin = await userRepository.findOne({
      where: { email: 'indt@gmail.com' },
    });

    if (!admin) {
      await userRepository.insert({
        id: new UniqueEntityID().toString(),
        name: 'Indt',
        surname: 'Indt',
        email: 'indt@gmail.com',
        password: await bcrypt.hash('123456', 10),
        accessLevel: 1,
        createdAt: new Date(),
        isActive: true,
      });
    }
  }
}
