import { Module } from '@nestjs/common';
import { FormAnswersService } from './form-answers.service';
import { FormAnswersController } from './form-answers.controller';
import { PrismaService } from '../../services/prisma.service';

@Module({
  controllers: [FormAnswersController],
  providers: [FormAnswersService, PrismaService],
})
export class FormAnswersModule {}
