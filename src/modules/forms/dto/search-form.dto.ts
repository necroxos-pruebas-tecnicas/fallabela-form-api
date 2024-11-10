import { IsOptional, IsString } from 'class-validator';

export class SearchFormDto {
  @IsOptional()
  @IsString()
  value: string;
}
