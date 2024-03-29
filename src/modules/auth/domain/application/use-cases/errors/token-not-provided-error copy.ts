import { UseCaseError } from 'src/core/erros/use-case-error.contract';

export class TokenNotProvidesError extends Error implements UseCaseError {
  constructor(message: string = 'Token não fornecido') {
    super(message);
  }
}
