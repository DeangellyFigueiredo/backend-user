import { Either, failure, success } from 'src/core/types/either';
import { EmailOrPasswordInvalidError } from './errors/email-or-password-invalid-error';
import { FindUserByEmailUseCase } from 'src/modules/user/domain/application/use-cases/find-user-by-email.use-case';
import { ComparePasswordUseCase } from './compare-password.use-case';
import { EAccessLevel } from 'src/modules/user/domain/enterprise/user.entity';
import { GenerateTokenUseCase } from './generate-token.use-case';
import { RoleNotAuthorizedError } from './errors/role-not-authorized-error';

interface SignInUseCaseRequest {
  email: string;
  password: string;
}

type SignInUseCaseResponse = Either<
  EmailOrPasswordInvalidError,
  {
    sub: string;
    role: EAccessLevel;
    access_token: string;
  }
>;

export class SignInUseCase {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly comparePasswordUseCase: ComparePasswordUseCase,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute({
    email,
    password,
  }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const existsUser = await this.findUserByEmailUseCase.execute({ email });

    if (existsUser.isFailure()) {
      return failure(new EmailOrPasswordInvalidError());
    }

    const comparePasswordResponse = await this.comparePasswordUseCase.execute({
      password,
      hashedPassword: existsUser.value.user.password,
    });

    if (!comparePasswordResponse.value) {
      return failure(new EmailOrPasswordInvalidError());
    }

    const result = {
      sub: existsUser.value.user.id.toString(),
      role: existsUser.value.user.accessLevel,
    };

    const token = await this.generateTokenUseCase.execute({
      expireToken: 1 * 1000 * 60 * 60,
      user: {
        sub: existsUser.value.user.id.toString(),
        role: existsUser.value.user.accessLevel,
      },
    });

    if (token.isFailure()) return failure(new RoleNotAuthorizedError());

    return success({ ...result, access_token: token.value.access_token });
  }
}
