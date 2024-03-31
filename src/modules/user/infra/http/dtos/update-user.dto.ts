import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(120)
  readonly name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(120)
  readonly surname: string;
  @ApiProperty()
  @IsOptional()
  @IsEnum(EAccessLevel, { message: 'Invalid access level' })
  readonly accessLevel: number;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;
}
