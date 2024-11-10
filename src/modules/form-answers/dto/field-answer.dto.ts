import { IsDefined, IsString } from 'class-validator';

export class FieldAnswersDto {
  @IsDefined()
  @IsString()
  fieldId: string;

  @IsDefined()
  @IsString()
  value: string;
}
