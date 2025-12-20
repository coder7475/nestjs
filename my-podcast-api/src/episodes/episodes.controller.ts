import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episode } from './entity/episode.entity';
import { ConfigService } from './../config/config.service';
import { IsPositivePipe } from 'src/pipes/isPositive.pipe';

@Controller('episodes')
export class EpisodesController {
  // Inject EpisodesService and ConfigService
  constructor(
    private episodeService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe, IsPositivePipe)
    limit: number,
  ) {
    return this.episodeService.findAll(sort, limit);
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
  create(@Body(ValidationPipe) input: Episode) {
    return this.episodeService.createEpisode(input);
  }
}
