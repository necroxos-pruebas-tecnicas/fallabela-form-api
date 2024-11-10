import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { PrismaClient } from '@prisma/client';
import { SearchFormDto } from './dto';

@Injectable()
export class FormsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(FormsService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected!');
  }

  async create(createFromDto: CreateFormDto) {
    const { fields, ...form } = createFromDto;

    return this.form.create({
      data: {
        name: form.name,
        description: form.description,
        fields: {
          create: fields.map((field) => ({
            name: field.name,
            label: field.label,
            type: field.type,
            required: field.required,
            defaultValue: field.defaultValue,
            ...(field.values && {
              values: {
                create: field.values.map((value) => ({
                  value: value,
                })),
              },
            }),
          })),
        },
      },
    });
  }

  findAll({ value }: SearchFormDto) {
    return this.form.findMany({
      ...(value && {
        where: {
          OR: [
            { id: { contains: value } },
            { name: { contains: value } },
            { description: { contains: value } },
          ],
        },
      }),
      include: {
        fields: {
          include: { values: true },
        },
      },
    });
  }

  findOne(id: string) {
    return this.form.findFirst({
      where: { id },
      include: {
        fields: {
          include: { values: true },
        },
      },
    });
  }
}
