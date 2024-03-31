import { UseCaseError } from 'src/core/erros/use-case-error.contract';

export class UserNotFoundError extends Error implements UseCaseError {
  constructor(message: string = 'Usuário não encontrado') {
    super(message);
  }
}
