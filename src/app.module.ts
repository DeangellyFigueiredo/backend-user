import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/infra/persistence/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/typeorm/typeorm.module';
import { HttpAuthModule } from './modules/auth/infra/http/http-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UserModule,
    DatabaseModule,
    HttpAuthModule,
  ],
})
export class AppModule {}
