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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserPresenter } from '../presenters/user.presenters';
import { DeleteUserUseCase } from 'src/modules/user/domain/application/use-cases/delete-user.use-case';
import { UserNotFoundError } from 'src/modules/user/domain/application/use-cases/erros/user-not-found.error';
import { UpdateUserUseCase } from 'src/modules/user/domain/application/use-cases/update-user.use-case';
import { UpdateUserDto } from '../dtos/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}
  @ApiOperation({
    summary: 'Criar usuário',
    description: 'Utilize este endpoint para criar um usário',
  })
  @HttpCode(200)
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
  @ApiOperation({
    summary: 'Listar usuários',
    description: 'Utilize este endpoint para listar os usuários',
  })
  @HttpCode(200)
  @Get()
  async findAll(@Query('page') page: number) {
    const result = await this.getAllUserUseCase.execute({ page });

    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const data = result.value.users.map((item) => UserPresenter.toHTTP(item));
    return data;
  }

  @ApiOperation({
    summary: 'Deletar usuários',
    description: 'Utilize este endpoint para deletar um usuário',
  })
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.deleteUserUseCase.execute({ id });

    if (result.isFailure()) {
      throw new BadRequestException(result.value.message);
    }

    return result.value;
  }

  @ApiOperation({
    summary: 'Atualizar usuário',
    description: 'Utilize este endpoint para atualizar um usuário',
  })
  @HttpCode(200)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const { name, surname, accessLevel } = body;
    const result = await this.updateUserUseCase.execute({
      id,
      name,
      surname,
      accessLevel,
    });

    if (result.isFailure()) {
      throw new BadRequestException(result.value.message);
    }

    return {
      message: 'User updated successfully',
    };
  }
}
