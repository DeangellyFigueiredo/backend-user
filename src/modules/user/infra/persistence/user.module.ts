
import { Module } from '@nestjs/common';
import { HttpUserModule } from '../http/http-user.module';
import { PersistenceUserModule } from './typeorm/persistence-user.module';

@Module({
  imports:[PersistenceUserModule, HttpUserModule]

})
export class UserModule {}
