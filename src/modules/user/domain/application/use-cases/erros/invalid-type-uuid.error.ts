import { UseCaseError } from 'src/core/erros/use-case-error.contract';

export class InvalidTypeUUIDError extends Error implements UseCaseError {
  constructor(message: string = 'Invalid ID') {
    super(message);
  }
}
