import { UseCaseError } from 'src/core/erros/use-case-error.contract';

export class UserNotFoundError extends Error implements UseCaseError {
  constructor(message: string = 'User not found') {
    super(message);
  }
}
