import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from '../health-check.controller';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should response', () => {
    const response = controller.healthCheck();

    expect(response).toBe('Form-API is up and running!');
  });
});
