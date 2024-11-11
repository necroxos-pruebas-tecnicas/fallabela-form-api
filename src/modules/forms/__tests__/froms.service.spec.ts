import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { FormsService } from '../forms.service';
import { PrismaService } from '../../../services/prisma.service';
import {
  CREATE_DTO_FORM_MOCK,
  CREATE_PRISMA_FORM_MOCK,
  RESPONSE_FORM_MOCK,
} from './mocks/form-create.mock';

describe('FromsService', () => {
  let service: FormsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<FormsService>(FormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call create on Prisma with correct data', async () => {
      prismaMock.form.create.mockResolvedValue(RESPONSE_FORM_MOCK);

      const result = await service.create(CREATE_DTO_FORM_MOCK);

      expect(prismaMock.form.create).toHaveBeenCalledWith(
        CREATE_PRISMA_FORM_MOCK,
      );
      expect(result).toEqual(RESPONSE_FORM_MOCK);
    });
  });

  describe('findAll', () => {
    it('should return a list of forms', async () => {
      prismaMock.form.findMany.mockResolvedValue([RESPONSE_FORM_MOCK]);

      const result = await service.findAll({});
      expect(prismaMock.form.findMany).toHaveBeenCalledWith({
        include: {
          fields: {
            include: { values: true },
          },
        },
      });
      expect(result).toEqual([RESPONSE_FORM_MOCK]);
    });

    it('should return a list of forms filtered by search value', async () => {
      const value = 'form-1';
      prismaMock.form.findMany.mockResolvedValue([RESPONSE_FORM_MOCK]);

      const result = await service.findAll({ value });
      expect(prismaMock.form.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { id: { contains: value } },
            { name: { contains: value } },
            { description: { contains: value } },
          ],
        },
        include: {
          fields: {
            include: { values: true },
          },
        },
      });
      expect(result).toEqual([RESPONSE_FORM_MOCK]);
    });
  });

  describe('findOne', () => {
    it('should return a form by id', async () => {
      const id = 'FROM-QWERTY';
      prismaMock.form.findFirst.mockResolvedValue(RESPONSE_FORM_MOCK);

      const result = await service.findOne(id);

      expect(prismaMock.form.findFirst).toHaveBeenCalledWith({
        where: { id },
        include: {
          fields: {
            include: { values: true },
          },
        },
      });
      expect(result).toEqual(RESPONSE_FORM_MOCK);
    });
  });
});
