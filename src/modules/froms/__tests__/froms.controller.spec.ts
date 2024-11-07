import { Test, TestingModule } from '@nestjs/testing';
import { FromsController } from '../froms.controller';
import { FromsService } from '../froms.service';

describe('FromsController', () => {
  let controller: FromsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FromsController],
      providers: [FromsService],
    }).compile();

    controller = module.get<FromsController>(FromsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
