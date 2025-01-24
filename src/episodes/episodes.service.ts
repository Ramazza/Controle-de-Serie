import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './episodes.entity';
import { Series } from '../series/series.entity';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private episodesRepository: Repository<Episode>,
  ) {}

  async createEpisode(
    series: Series,
    title: string,
    episodeNumber: number,
  ): Promise<Episode> {
    const episode = this.episodesRepository.create({
      series,
      title,
      episodeNumber,
    });
    return this.episodesRepository.save(episode);
  }

  async findBySeries(series: Series): Promise<Episode[]> {
    return this.episodesRepository.find({ where: { series } });
  }

  async markWatched(episodeId: string, watched: boolean): Promise<Episode> {
    const episode = await this.episodesRepository.findOne({
      where: { id: episodeId },
    });
    if (!episode) {
      throw new NotFoundException('Episódio não encontrado');
    }
    episode.watched = watched;
    return this.episodesRepository.save(episode);
  }
}
