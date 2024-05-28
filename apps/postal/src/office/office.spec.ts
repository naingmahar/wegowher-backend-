import { Test, TestingModule } from '@nestjs/testing';
import { Office } from './office';

describe('Office', () => {
  let provider: Office;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Office],
    }).compile();

    provider = module.get<Office>(Office);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
