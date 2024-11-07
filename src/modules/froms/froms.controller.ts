import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FromsService } from './froms.service';
import { CreateFromDto } from './dto/create-from.dto';

@Controller('froms')
export class FromsController {
  constructor(private readonly fromsService: FromsService) {}

  @Post()
  create(@Body() createFromDto: CreateFromDto) {
    return this.fromsService.create(createFromDto);
  }

  @Get()
  findAll() {
    return this.fromsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fromsService.findOne(+id);
  }
}
