import { Test, TestingModule } from '@nestjs/testing';
import { FormAnswersController } from '../form-answers.controller';
import { FormAnswersService } from '../form-answers.service';
import { CreateFormAnswersDto } from '../dto';

describe('FormAnswersController', () => {
  let controller: FormAnswersController;
  let service: FormAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormAnswersController],
      providers: [
        {
          provide: FormAnswersService,
          useValue: { create: jest.fn(), findByForm: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<FormAnswersController>(FormAnswersController);
    service = module.get<FormAnswersService>(FormAnswersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create from service', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce((createDto: CreateFormAnswersDto) => {
          expect(createDto).toBeDefined();
          expect(createDto).toHaveProperty('answers');
          return null;
        });

      const createAnswers: CreateFormAnswersDto = {
        answers: [],
      };

      await controller.create(createAnswers);
    });
  });

  describe('findByForm', () => {
    it('should call find from service and filter by fomrId', async () => {
      const formId = 'form-1';

      jest
        .spyOn(service, 'findByForm')
        .mockImplementationOnce((formId: string) => {
          expect(formId).toBeDefined();
          expect(formId).toBe(formId);
          return null;
        });

      await controller.findByForm(formId);
    });
  });
});
