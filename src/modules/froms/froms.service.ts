import { Injectable } from '@nestjs/common';
import { CreateFromDto } from './dto/create-from.dto';

@Injectable()
export class FromsService {
  create(createFromDto: CreateFromDto) {
    return { message: 'This action adds a new from', dto: createFromDto };
  }

  findAll() {
    return `This action returns all froms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} from`;
  }
}
