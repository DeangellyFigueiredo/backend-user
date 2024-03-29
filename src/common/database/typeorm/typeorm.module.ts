import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        username: configService.getOrThrow('DATABASE_USER'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        database: configService.getOrThrow('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('DATABASE_MY_SYNC'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
