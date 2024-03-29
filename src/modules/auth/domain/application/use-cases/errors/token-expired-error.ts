import { UseCaseError } from 'src/core/erros/use-case-error.contract';

export class TokenExpiredError extends Error implements UseCaseError {
  constructor(message: string = 'Token expirado') {
    super(message);
  }
}
