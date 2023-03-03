import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsDefined,
  IsDateString,
  IsEmpty,
  IsArray,
} from 'class-validator';
import { User, userBaseInfo, userStrongInfo } from '../entities/user.entity';

export class CreateUserDto extends PartialType(User) {
  @ApiProperty({ type: Date })
  @IsDateString()
  @IsOptional()
  @prop()
  createdAt?: Date;
}

// export class CreateUsersDto {
//   @ApiProperty({ type: () => [CreateUserDto] })
//   @IsArray()
//   @IsDefined()
//   items: CreateUserDto[];
// }
