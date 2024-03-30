import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EAccessLevel } from 'src/modules/user/domain/enterprise/user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(120)
  readonly name: string;
  @IsString()
  @IsOptional()
  @MaxLength(120)
  readonly surname: string;
  @IsOptional()
  @IsEnum(EAccessLevel, { message: 'Invalid access level' })
  readonly accessLevel: number;
  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;
}
