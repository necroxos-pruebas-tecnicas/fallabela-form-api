import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateFormAnswersDto } from './dto/create-form-answer.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FormAnswersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(FormAnswersService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected!');
  }

  create({ answers }: CreateFormAnswersDto) {
    return this.answer.createMany({
      data: answers,
    });
  }

  async findByForm(formId: string) {
    const form = await this.form.findFirst({
      where: { id: formId },
      include: { fields: true },
    });

    const fieldIds = form.fields.map((field) => field.id);

    return this.answer.findMany({ where: { fieldId: { in: fieldIds } } });
  }
}
