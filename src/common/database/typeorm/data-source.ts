import { MainSeeder } from '../../../seeds/main-seeder';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: '192.168.1.20',
  port: 5432,
  username: 'postgres',
  password: 'postgres-password',
  database: 'user',
  synchronize: true,
  seeds: [MainSeeder],
  entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
