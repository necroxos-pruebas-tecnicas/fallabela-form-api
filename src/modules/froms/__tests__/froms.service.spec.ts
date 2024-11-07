import { Test, TestingModule } from '@nestjs/testing';
import { FromsService } from '../froms.service';

describe('FromsService', () => {
  let service: FromsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FromsService],
    }).compile();

    service = module.get<FromsService>(FromsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
