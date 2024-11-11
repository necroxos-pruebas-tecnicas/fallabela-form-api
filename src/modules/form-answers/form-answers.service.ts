import { Injectable } from '@nestjs/common';
import { CreateFormAnswersDto } from './dto';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class FormAnswersService {
  constructor(private readonly prisma: PrismaService) {}

  create({ answers }: CreateFormAnswersDto) {
    return this.prisma.answer.createMany({
      data: answers,
    });
  }

  async findByForm(formId: string) {
    const fields = await this.prisma.field.findMany({
      where: { formId: formId },
      select: { id: true },
    });

    const fieldIds = fields.map(({ id }) => id);

    return this.prisma.answer.findMany({
      where: { fieldId: { in: fieldIds } },
    });
  }
}
