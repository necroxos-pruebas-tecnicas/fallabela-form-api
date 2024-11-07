import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FromsService } from './froms.service';
import { CreateFromDto } from './dto/create-from.dto';
import { UpdateFromDto } from './dto/update-from.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFromDto: UpdateFromDto) {
    return this.fromsService.update(+id, updateFromDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fromsService.remove(+id);
  }
}
