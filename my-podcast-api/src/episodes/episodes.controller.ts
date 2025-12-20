import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episode } from './entity/episode.entity';
import { ConfigService } from './../config/config.service';
import { IsPositivePipe } from 'src/pipes/isPositive.pipe';
import { AuthGuard } from 'src/guards/api-key-guards.guard';

@UseGuards(AuthGuard)
@Controller('episodes')
export class EpisodesController {
  // Inject EpisodesService and ConfigService
  constructor(
    private episodeService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe, IsPositivePipe)
    limit: number,
    @Query('sort')
    sort: 'asc' | 'desc' = 'desc',
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
