interface ExtractTokenUseCaseRequest {
  tokenToExtract: string;
}

type ExtractTokenUseCaseResponse = {
  token: string;
};

export class ExtractTokenUseCase {
  async execute({
    tokenToExtract,
  }: ExtractTokenUseCaseRequest): Promise<ExtractTokenUseCaseResponse> {
    const [, token] = tokenToExtract.split('Bearer ');
    return { token };
  }
}
