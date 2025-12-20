import { randomUUID } from 'node:crypto';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { Injectable } from '@nestjs/common';
import { Episode } from './entity/episode.entity';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  findAll(sort: 'asc' | 'desc' = 'asc') {
    const sortAsc = (a: Episode, b: Episode) => (a.name < b.name ? -1 : 1);
    const sortDesc = (a: Episode, b: Episode) => (a.name > b.name ? -1 : 1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  findOne(id: string) {
    const episode = this.episodes.find((episode) => episode.id === id);
    return episode;
  }

  findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  createEpisode(CreateEpisodeDto: CreateEpisodeDto) {
    const newEpidsode = { ...CreateEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpidsode);
    return newEpidsode;
  }
}
