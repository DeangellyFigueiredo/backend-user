import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/infra/persistence/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5445,
    username: 'postgres',
    password: 'teste-dean',
    database: 'user',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  })],
})
export class AppModule {}
