import { Either, failure, success } from 'src/core/types/either';
import { TokenInvalidError } from './errors/token-invalid-error';
import { JwtService } from '@nestjs/jwt';

interface VerifyTokenUseCaseRequest {
  token: string;
}

type VerifyTokenUseCaseResponse = Either<
  TokenInvalidError,
  {
    decodedToken: any;
  }
>;

export class VerifyTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}
  async execute({
    token,
  }: VerifyTokenUseCaseRequest): Promise<VerifyTokenUseCaseResponse> {
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY_ACCESS_TOKEN,
      });
      return success({ decodedToken });
    } catch (e) {
      return failure(new TokenInvalidError());
    }
  }
}
