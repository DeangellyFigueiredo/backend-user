import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { EAccessLevel } from 'src/modules/user/domain/enterprise/user.entity';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  @MaxLength(120)
  readonly name: string;
  @IsString()
  @IsDefined()
  @MaxLength(120)
  readonly surname: string;
  @IsString()
  @IsDefined()
  @MaxLength(255)
  readonly email: string;
  @IsString()
  @IsDefined()
  @MaxLength(120)
  readonly password: string;
  @IsEnum(EAccessLevel, { message: 'Invalid access level' })
  @IsDefined()
  readonly accessLevel: number;
}
