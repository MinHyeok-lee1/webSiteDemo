import * as mongoose from 'mongoose';
import {
  ApiProperty,
  PartialType,
  OmitType,
  PickType,
  IntersectionType,
} from '@nestjs/swagger';
import {
  IsString,
  IsDefined,
  IsNumber,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';

export enum UserRole {
  Warrior = 'Warrior',
  Magician = 'Magician',
  Thief = 'Thief',
}

export class userBaseInfo {
  @ApiProperty({ type: String })
  @IsString()
  @IsDefined()
  @prop()
  name: string;

  @ApiProperty({ enum: ['Warrior', 'Magician', 'Thief'] })
  @IsEnum(UserRole)
  @IsDefined()
  @prop()
  role: UserRole;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  @prop()
  age: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  @prop()
  major: number;
}

export class userStrongInfo {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  @prop()
  level: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsDefined()
  @prop({ type: () => [String] })
  skills: string[];

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  @prop()
  sheildPower: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  @prop()
  magicPower: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsDefined()
  @prop()
  swordPower: number;
}

export class UserInfo {
  @ApiProperty({ type: Date })
  @IsDateString()
  @IsOptional()
  @prop()
  playTime?: Date;

  @prop({ type: () => userStrongInfo, _id: false })
  @ApiProperty()
  @IsDefined()
  @ValidateNested()
  @Type(() => userStrongInfo)
  public userPower: userStrongInfo;

  @prop({ type: () => userBaseInfo, _id: false })
  @ApiProperty({ description: '사용자 기본정보' })
  @IsDefined()
  @Type(() => userBaseInfo)
  @ValidateNested()
  public userBase: userBaseInfo;
}

// export class UserInfo extends IntersectionType(userStrongInfo, userBaseInfo) {
//   @ApiProperty({ type: Date })
//   @IsDateString()
//   @IsOptional()
//   @prop()
//   playTime?: Date;

// }

export class PartialTypeClass extends PartialType(userStrongInfo) {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  test1: number;
}

export class OmitTypeClass extends OmitType(userStrongInfo, [
  'magicPower',
] as const) {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  test2: number;
}

export class PickTypeClass extends PickType(userStrongInfo, [
  'level',
] as const) {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  test3: number;
}

export class PartialTypeOmitClass extends PartialType(
  OmitType(userStrongInfo, ['swordPower', 'magicPower'] as const),
) {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  test4: number;
}

export class User extends UserInfo {
  // createdAt: Date;
}
