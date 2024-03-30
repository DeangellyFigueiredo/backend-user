import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { SignInUseCase } from '../../domain/application/use-cases/sign-in.use-case';
import { FindUserByEmailUseCase } from 'src/modules/user/domain/application/use-cases/find-user-by-email.use-case';
import { ComparePasswordUseCase } from '../../domain/application/use-cases/compare-password.use-case';
import { GenerateTokenUseCase } from '../../domain/application/use-cases/generate-token.use-case';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthenticateUseCase } from '../../domain/application/use-cases/authenticate.use-case';
import { DecodeTokenUseCase } from '../../domain/application/use-cases/decode-jwt.use-case';
import { TypeOrmUserRepositoryImpl } from 'src/modules/user/infra/persistence/typeorm/repositories/typeorm-user-repository.impl';
import { PersistenceUserModule } from 'src/modules/user/infra/persistence/typeorm/persistence-user.module';
import { SetPermissionsUseCase } from '../../domain/application/use-cases/set-permissions.use-case';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/authentication/auth.guard';
import { ExtractTokenUseCase } from '../../domain/application/use-cases/extract-token.use-case';
import { VerifyTokenUseCase } from '../../domain/application/use-cases/verify-token.use-case';

@Module({
  imports: [
    PersistenceUserModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY_ACCESS_TOKEN,
      signOptions: { expiresIn: '24000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: SignInUseCase,
      useFactory: (
        findUserByEmailUseCase: FindUserByEmailUseCase,
        comparePasswordUseCase: ComparePasswordUseCase,
        generateTokenUseCase: GenerateTokenUseCase,
      ) =>
        new SignInUseCase(
          findUserByEmailUseCase,
          comparePasswordUseCase,
          generateTokenUseCase,
        ),
      inject: [
        FindUserByEmailUseCase,
        ComparePasswordUseCase,
        GenerateTokenUseCase,
      ],
    },
    ExtractTokenUseCase,
    {
      provide: VerifyTokenUseCase,
      useFactory: (jwtService: JwtService) =>
        new VerifyTokenUseCase(jwtService),
      inject: [JwtService],
    },
    {
      provide: AuthenticateUseCase,
      useFactory: (
        extractTokenUseCase: ExtractTokenUseCase,
        verifyTokenUseCase: VerifyTokenUseCase,
      ) => new AuthenticateUseCase(extractTokenUseCase, verifyTokenUseCase),
      inject: [ExtractTokenUseCase, VerifyTokenUseCase],
    },
    {
      provide: DecodeTokenUseCase,
      useFactory: (
        extractTokenUseCase: ExtractTokenUseCase,
        jwtService: JwtService,
      ) => new DecodeTokenUseCase(extractTokenUseCase, jwtService),
      inject: [ExtractTokenUseCase, JwtService],
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: FindUserByEmailUseCase,
      useFactory: (userRepository: TypeOrmUserRepositoryImpl) =>
        new FindUserByEmailUseCase(userRepository),
      inject: [TypeOrmUserRepositoryImpl],
    },

    ComparePasswordUseCase,
    SetPermissionsUseCase,
    {
      provide: GenerateTokenUseCase,
      useFactory: (
        jwtService: JwtService,
        setPermissionUseCase: SetPermissionsUseCase,
      ) => new GenerateTokenUseCase(jwtService, setPermissionUseCase),
      inject: [JwtService, SetPermissionsUseCase],
    },
  ],
})
export class HttpAuthModule {
  constructor() {}
}
