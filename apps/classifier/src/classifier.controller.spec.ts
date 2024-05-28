import { Test, TestingModule } from '@nestjs/testing';
import { ClassifierController } from './classifier.controller';
import { ClassifierService } from './classifier.service';

describe('ClassifierController', () => {
  let classifierController: ClassifierController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClassifierController],
      providers: [ClassifierService],
    }).compile();

    classifierController = app.get<ClassifierController>(ClassifierController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(classifierController.getHello()).toBe('Hello World!');
    });
  });
});
