import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();
  const mockEpisodesService = {
    findAll: async () => [{ id: 'id' }],
    findOne: mockFindOne,
    findFeatured: async () => [{ id: 'featured-id' }],
    createEpisode: async () => ({ id: 'id' }),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    describe('when episodes are found', () => {
      const mockResult = [{ id: 'id' }];

      beforeEach(() => {
        jest
          .spyOn(mockEpisodesService, 'findAll')
          .mockResolvedValueOnce(mockResult);
      });

      it('should return an array of episodes', async () => {
        const episodes = await controller.findAll();
        expect(episodes).toEqual(mockResult);
      });

      it('should call EpisodesService.findAll', async () => {
        await controller.findAll();
        expect(mockEpisodesService.findAll).toHaveBeenCalled();
      });
    });

    describe('when episodes are not found', () => {
      const mockResult = [];

      beforeEach(() => {
        jest
          .spyOn(mockEpisodesService, 'findAll')
          .mockResolvedValueOnce(mockResult);
      });

      it('should return an empty array', async () => {
        const episodes = await controller.findAll();
        expect(episodes).toEqual(mockResult);
      });

      it('should call EpisodesService.findAll', async () => {
        await controller.findAll();
        expect(mockEpisodesService.findAll).toHaveBeenCalled();
      });
    });
  });
});
