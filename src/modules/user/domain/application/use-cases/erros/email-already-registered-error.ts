import { UseCaseError } from "src/core/erros/use-case-error.contract";

export class EmailAlreadyRegisteredError extends Error implements UseCaseError {
  constructor(message: string = 'Email already registered') {
    super(message);
  }
}
