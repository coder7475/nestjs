import { randomUUID } from 'node:crypto';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { Episode } from './entity/episode.entity';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  findAll(sort: 'asc' | 'desc' = 'asc', limit: number = 10): Episode[] {
    const sortAsc = (a: Episode, b: Episode) => (a.name < b.name ? -1 : 1);
    const sortDesc = (a: Episode, b: Episode) => (a.name > b.name ? -1 : 1);

    const sorted = [...this.episodes].sort(sort === 'asc' ? sortAsc : sortDesc);

    return sorted.slice(0, limit);
  }

  findOne(id: string): Episode {
    const episode = this.episodes.find((episode) => episode.id === id);
    if (!episode) {
      throw new HttpException('Episode not found', 404);
    }
    return episode;
  }

  findFeatured(): Episode[] {
    return this.episodes.filter((episode) => episode.featured);
  }

  createEpisode(createEpisodeDto: CreateEpisodeDto): Episode {
    const newEpisode: Episode = { ...createEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);
    return newEpisode;
  }
}
