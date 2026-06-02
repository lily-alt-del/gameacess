import { Test, TestingModule } from '@nestjs/testing';
import { ModController } from './mod.controller';
import { ModService } from './mod.service';

describe('ModController', () => {
  let controller: ModController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModController],
      providers: [ModService],
    }).compile();

    controller = module.get<ModController>(ModController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
