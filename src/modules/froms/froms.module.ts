import { Module } from '@nestjs/common';
import { FromsService } from './froms.service';
import { FromsController } from './froms.controller';

@Module({
  controllers: [FromsController],
  providers: [FromsService],
})
export class FromsModule {}
