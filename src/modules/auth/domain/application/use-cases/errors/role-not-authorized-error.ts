import { UseCaseError } from 'src/core/erros/use-case-error.contract';

export class RoleNotAuthorizedError extends Error implements UseCaseError {
  constructor(message: string = 'Cargo não autorizado') {
    super(message);
  }
}
