import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { EAccessLevel } from 'src/modules/user/domain/enterprise/user.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @MaxLength(120)
  readonly name: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @MaxLength(120)
  readonly surname: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @MaxLength(255)
  readonly email: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @MaxLength(120)
  readonly password: string;
  @ApiProperty()
  @IsEnum(EAccessLevel, { message: 'Invalid access level' })
  @IsDefined()
  readonly accessLevel: number;
}
