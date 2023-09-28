import { Test, TestingModule } from '@nestjs/testing';
import { HistoriaClinica } from './historia-clinica.providers';

describe('HistoriaClinica', () => {
  let provider: HistoriaClinica;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoriaClinica],
    }).compile();

    provider = module.get<HistoriaClinica>(HistoriaClinica);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
