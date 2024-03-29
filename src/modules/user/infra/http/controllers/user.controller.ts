import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  BadRequestException,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/domain/application/use-cases/create-user.use-case';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EmailAlreadyRegisteredError } from 'src/modules/user/domain/application/use-cases/erros/email-already-registered-error';
import { GetAllUserUseCase } from 'src/modules/user/domain/application/use-cases/get-all-user.use-case';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
  ) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { name, surname, email, password, accessLevel } = createUserDto;
    const result = await this.createUserUseCase.execute({
      name,
      surname,
      email,
      password,
      accessLevel,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case EmailAlreadyRegisteredError:
          throw new BadRequestException(error.message);
        default:
          throw new BadRequestException();
      }
    }

    return {
      message: 'User created successfully',
    };
  }

  @Get()
  async findAll(@Query('page') page: number) {
    const result = await this.getAllUserUseCase.execute({ page });

    if (result.isFailure()) {
      throw new BadRequestException();
    }

    return result.value;
  }
}
