import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { SearchFormDto } from './dto';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class FormsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFromDto: CreateFormDto) {
    const { fields, ...form } = createFromDto;

    return this.prisma.form.create({
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
    return this.prisma.form.findMany({
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
    return this.prisma.form.findFirst({
      where: { id },
      include: {
        fields: {
          include: { values: true },
        },
      },
    });
  }
}
