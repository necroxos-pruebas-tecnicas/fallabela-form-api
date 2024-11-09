import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FieldsDto } from './fields.dto';

export class CreateFormDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FieldsDto)
  fields: FieldsDto[];
}
