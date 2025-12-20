import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockEpisodesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findFeatured: jest.fn(),
    createEpisode: jest.fn(),
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
        mockEpisodesService.findAll.mockResolvedValueOnce(mockResult);
      });

      it('should return an array of episodes', () => {
        const episodes = controller.findAll('asc', 10);
        expect(episodes).toEqual(mockResult);
      });

      it('should call EpisodesService.findAll with defaults', () => {
        controller.findAll('asc', 10);
        expect(mockEpisodesService.findAll).toHaveBeenCalledWith('asc', 10);
      });
    });

    describe('when episodes are not found', () => {
      const mockResult: any[] = [];

      beforeEach(() => {
        mockEpisodesService.findAll.mockResolvedValueOnce(mockResult);
      });

      it('should return an empty array', () => {
        const episodes = controller.findAll('asc', 10);
        expect(episodes).toEqual(mockResult);
      });

      it('should call EpisodesService.findAll with defaults', () => {
        controller.findAll('asc', 10);
        expect(mockEpisodesService.findAll).toHaveBeenCalledWith('asc', 10);
      });
    });
  });
});
