import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from 'src/modules/auth/domain/application/use-cases/sign-in.use-case';
import { Public } from 'src/authentication/decorators/public.decorator';
import { VerifyTokenUseCase } from 'src/modules/auth/domain/application/use-cases/verify-token.use-case';
import { TokenDto } from '../dtos/token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly verifyTokenUseCase: VerifyTokenUseCase,
  ) {}

  @ApiOperation({
    summary: 'Logar usuário',
    description: 'Utilize este endpoint para fazer o login',
  })
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

  @ApiOperation({
    summary: 'Verificar o token',
    description: 'Utilize este endpoint para validar o token de acesso',
  })
  @Public()
  @Post('verify/token')
  async verifyToken(@Body() body: TokenDto) {
    const result = await this.verifyTokenUseCase.execute({ token: body.token });

    if (result.isFailure()) {
      throw new BadRequestException(result.value.message);
    }

    return result.value;
  }
}
