import { UseCaseError } from 'src/core/erros/use-case-error.contract';

export class EmailOrPasswordInvalidError extends Error implements UseCaseError {
  constructor(message: string = 'Email ou senha inválidos') {
    super(message);
  }
}
