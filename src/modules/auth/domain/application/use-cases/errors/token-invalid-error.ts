import { UseCaseError } from 'src/core/erros/use-case-error.contract';

export class TokenInvalidError extends Error implements UseCaseError {
  constructor(message: string = 'Token inválido') {
    super(message);
  }
}
