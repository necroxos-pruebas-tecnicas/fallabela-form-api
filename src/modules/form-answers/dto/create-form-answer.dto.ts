import { ArrayMinSize, IsDefined, ValidateNested } from 'class-validator';
import { FieldAnswersDto } from './field-answer.dto';
import { Type } from 'class-transformer';

export class CreateFormAnswersDto {
  @IsDefined()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FieldAnswersDto)
  answers: FieldAnswersDto[];
}
