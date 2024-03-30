import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from 'src/modules/auth/domain/application/use-cases/sign-in.use-case';
import { Public } from 'src/authentication/decorators/public.decorator';
import { EmailOrPasswordInvalidError } from 'src/modules/auth/domain/application/use-cases/errors/email-or-password-invalid-error';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Public()
  @Post('/login')
  async login(@Body() body: SignInDto) {
    const { email, password } = body;
    const result = await this.signInUseCase.execute({ email, password });

    if (result.isFailure()) {
      throw new BadRequestException(result.value.message);
    }

    return result.value;
  }
}
