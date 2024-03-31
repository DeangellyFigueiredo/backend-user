import { Seeder, runSeeder } from 'typeorm-extension';
import { UserSeeder } from './user-seeder';
import { DataSource } from 'typeorm';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await runSeeder(dataSource, UserSeeder);
  }
}
