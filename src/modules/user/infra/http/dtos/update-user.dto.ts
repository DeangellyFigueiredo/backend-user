import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { EAccessLevel } from 'src/modules/user/domain/enterprise/user.entity';

export class UpdateUserDto {
  @IsString()
  @IsDefined()
  @MaxLength(120)
  readonly name: string;
  @IsString()
  @IsDefined()
  @MaxLength(120)
  readonly surname: string;
  @IsEnum(EAccessLevel, { message: 'Invalid access level' })
  @IsDefined()
  readonly accessLevel: number;
}
