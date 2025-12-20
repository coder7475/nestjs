import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episode } from './entity/episode.entity';
import { ConfigService } from 'src/config/config.service';

@Controller('episodes')
export class EpisodesController {
  // Inject EpisodesService and ConfigService
  constructor(
    private episodeService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    return this.episodeService.findAll(sort);
  }

  @Get('featured')
  findFeatured() {
    return this.episodeService.findFeatured();
  }

  @Get(':id')
  findOne(@Param() id: string) {
    return this.episodeService.findOne(id);
  }

  @Post()
  create(@Body() input: Episode) {
    return this.episodeService.createEpisode(input);
  }
}
