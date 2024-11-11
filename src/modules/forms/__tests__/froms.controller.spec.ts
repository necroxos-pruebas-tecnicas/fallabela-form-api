import { Test, TestingModule } from '@nestjs/testing';
import { FormsController } from '../forms.controller';
import { FormsService } from '../forms.service';
import { CreateFormDto, SearchFormDto } from '../dto';

describe('FromsController', () => {
  let controller: FormsController;
  let service: FormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormsController],
      providers: [
        {
          provide: FormsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FormsController>(FormsController);
    service = module.get<FormsService>(FormsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create from service', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce((createForm: CreateFormDto) => {
          expect(createForm).toBeDefined();
          expect(createForm).toHaveProperty('name');
          return null;
        });

      const createForm: CreateFormDto = {
        name: 'Example form',
        description: '',
        fields: [],
      };

      await controller.create(createForm);
    });
  });

  describe('findAll', () => {
    it('should call find all from service', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementationOnce((searchForm: SearchFormDto) => {
          expect(searchForm).toBeDefined();
          expect(searchForm).toHaveProperty('value');
          return null;
        });

      await controller.findAll({ value: 'form-1' });
    });
  });

  describe('findOne', () => {
    it('should call find one from service', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementationOnce((formId: string) => {
          expect(formId).toBeDefined();
          return null;
        });

      await controller.findOne('form-1');
    });
  });
});
