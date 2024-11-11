import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { FieldType } from '@prisma/client';

export class FieldsDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  label: string;

  @IsEnum(FieldType, {
    message: `Valid status are: ${Object.values(FieldType)}`,
  })
  type: FieldType;

  @IsDefined()
  @Transform(({ value }) => [1, '1', true, 'true'].includes(value))
  required: boolean;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  @IsString({ each: true })
  values: string[];

  @IsOptional()
  defaultValue?: string;
}
