import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FormAnswersService } from './form-answers.service';
import { CreateFormAnswersDto } from './dto';

@Controller('form-answers')
export class FormAnswersController {
  constructor(private readonly formAnswersService: FormAnswersService) {}

  @Post()
  create(@Body() createFormAnswerDto: CreateFormAnswersDto) {
    return this.formAnswersService.create(createFormAnswerDto);
  }

  @Get(':id')
  findByForm(@Param('id') formId: string) {
    return this.formAnswersService.findByForm(formId);
  }
}
