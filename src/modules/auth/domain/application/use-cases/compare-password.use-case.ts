import { Either, success } from 'src/core/types/either';
import * as bcrypt from 'bcrypt';
interface ComparePasswordUseCaseRequest {
  password: string;
  hashedPassword: string;
}

type ComparePasswordUseCaseResponse = Either<
  null,
  {
    isPasswordValid: boolean;
  }
>;

export class ComparePasswordUseCase {
  async execute({
    password,
    hashedPassword,
  }: ComparePasswordUseCaseRequest): Promise<ComparePasswordUseCaseResponse> {
    const isPasswordValid = bcrypt.compareSync(password, hashedPassword);

    return success({ isPasswordValid });
  }
}
