import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from 'src/modules/auth/domain/application/use-cases/sign-in.use-case';

@ApiTags('auth')
@Controller('auth')
export class UserController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('/login')
  async login(@Body() body: SignInDto) {
    const { email, password } = body;
    return await this.signInUseCase.execute({ email, password });
  }
}
