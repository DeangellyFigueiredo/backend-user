import { UseCaseError } from 'src/core/erros/use-case-error.contract';

export class InvalidTypeUUIDError extends Error implements UseCaseError {
  constructor(message: string = 'Id inválido, deve ser um UUID válido') {
    super(message);
  }
}
