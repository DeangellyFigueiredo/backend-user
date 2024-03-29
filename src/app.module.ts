import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/infra/persistence/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './common/database/typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UserModule,
    DatabaseModule,
  ],
})
export class AppModule {}
