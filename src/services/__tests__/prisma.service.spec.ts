import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';

jest.mock('@prisma/client');

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => jest.resetAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Prisma connections', () => {
    const connectSpy = jest.fn();
    const disconnectSpy = jest.fn();

    beforeEach(() => {
      service.$connect = connectSpy;
      service.$disconnect = disconnectSpy;
    });

    it('should call $connect on onModuleInit', async () => {
      await service.onModuleInit();

      expect(connectSpy).toHaveBeenCalledTimes(1);
    });

    it('should call $disconnect on onModuleDestroy', async () => {
      await service.onModuleDestroy();

      expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });
  });
});
