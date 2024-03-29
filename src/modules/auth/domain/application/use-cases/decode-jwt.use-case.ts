import { Either, failure, success } from 'src/core/types/either';
import { TokenNotProvidesError } from './errors/token-not-provided-error copy';
import { JwtService } from '@nestjs/jwt';
import { ExtractTokenUseCase } from './extract-token.use-case';

interface DecodeTokenUseCaseRequest {
  token: string;
}

type DecodeTokenUseCaseResponse = Either<
  TokenNotProvidesError,
  {
    decodedToken: any;
  }
>;

export class DecodeTokenUseCase {
  constructor(
    private readonly extractTokenUseCase: ExtractTokenUseCase,
    private readonly jwtService: JwtService,
  ) {}
  async execute({
    token,
  }: DecodeTokenUseCaseRequest): Promise<DecodeTokenUseCaseResponse> {
    const tokenExtracted = await this.extractTokenUseCase.execute({
      tokenToExtract: token,
    });

    if (!tokenExtracted.token) return failure(new TokenNotProvidesError());

    const decodeToken = await this.jwtService.decode(tokenExtracted.token);

    return success({ decodedToken: decodeToken });
  }
}
