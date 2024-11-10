import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { SearchFormDto } from './dto';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  create(@Body() createFromDto: CreateFormDto) {
    return this.formsService.create(createFromDto);
  }

  @Get()
  findAll(@Query() queryParam: SearchFormDto) {
    return this.formsService.findAll(queryParam);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(id);
  }
}
