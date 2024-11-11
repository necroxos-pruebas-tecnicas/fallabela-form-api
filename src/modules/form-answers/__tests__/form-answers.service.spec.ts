import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { FormAnswersService } from '../form-answers.service';
import { PrismaService } from '../../../services/prisma.service';
import { CreateFormAnswersDto } from '../dto';

describe('FormAnswersService', () => {
  let service: FormAnswersService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormAnswersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<FormAnswersService>(FormAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call createMany on Prisma with correct data', async () => {
      const createFormAnswersDto: CreateFormAnswersDto = {
        answers: [
          { fieldId: 'field-1', value: 'answer-1' },
          { fieldId: 'field-2', value: 'answer-2' },
        ],
      };

      prismaMock.answer.createMany.mockResolvedValue({
        count: 2,
      });

      const result = await service.create(createFormAnswersDto);

      expect(prismaMock.answer.createMany).toHaveBeenCalledWith({
        data: createFormAnswersDto.answers,
      });
      expect(result).toEqual({ count: 2 });
    });
  });

  describe('findByForm', () => {
    it('should return answers for a form by formId', async () => {
      // Arrange: Datos de prueba
      const formId = 'form-1';
      const mockFields: any = [{ id: 'field-1' }, { id: 'field-2' }];

      const mockAnswers: any = [
        {
          id: '1',
          fieldId: 'field-1',
          value: 'answer-1',
          createdAt: new Date(),
        },
        {
          id: '2',
          fieldId: 'field-2',
          value: 'answer-2',
          createdAt: new Date(),
        },
      ];

      prismaMock.field.findMany.mockResolvedValue(mockFields);
      prismaMock.answer.findMany.mockResolvedValue(mockAnswers);

      const result = await service.findByForm(formId);

      expect(prismaMock.field.findMany).toHaveBeenCalledWith({
        where: { formId },
        select: { id: true },
      });
      expect(prismaMock.answer.findMany).toHaveBeenCalledWith({
        where: { fieldId: { in: ['field-1', 'field-2'] } },
      });
      expect(result).toEqual(mockAnswers);
    });
  });
});
