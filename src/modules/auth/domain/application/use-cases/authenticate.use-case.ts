import { Either, failure, success } from 'src/core/types/either';
import { TokenNotProvidesError } from './errors/token-not-provided-error copy';
import { ExtractTokenUseCase } from './extract-token.use-case';
import { VerifyTokenUseCase } from './verify-token.use-case';
import { fromUnixTime, isAfter } from 'date-fns';
import { TokenInvalidError } from './errors/token-invalid-error';
import { TokenExpiredError } from './errors/token-expired-error';

interface AuthenticateUseCaseRequest {
  token: string;
}

type AuthenticateUseCaseResponse = Either<
  TokenNotProvidesError | TokenInvalidError | TokenExpiredError,
  {
    authenticated: boolean;
  }
>;

export class AuthenticateUseCase {
  constructor(
    private readonly extractTokenUseCase: ExtractTokenUseCase,
    private readonly verifyTokenUseCase: VerifyTokenUseCase,
  ) {}

  async execute({
    token,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    if (!token) {
      return failure(new TokenNotProvidesError());
    }
    const tokenExtracted = await this.extractTokenUseCase.execute({
      tokenToExtract: token,
    });
    const decodedTokenResult = await this.verifyTokenUseCase.execute({
      token: tokenExtracted.token,
    });
    if (decodedTokenResult.isFailure()) {
      return failure(new TokenInvalidError());
    }

    const tokenExpirationIsAfterNow = isAfter(
      fromUnixTime(decodedTokenResult.value.decodedToken.exp),
      new Date(),
    );

    if (!tokenExpirationIsAfterNow) {
      return failure(new TokenExpiredError());
    }

    return success({ authenticated: true });
  }
}
