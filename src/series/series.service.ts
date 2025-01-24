import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './series.entity';
import { User } from '../users/user.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}

  async addSeries(
    user: User,
    title: string,
    genre?: string,
    status?: string,
    priority?: number,
    releaseDate?: Date,
  ): Promise<Series> {
    const series = this.seriesRepository.create({
      title,
      genre,
      status,
      priority,
      releaseDate,
      user,
    });
    return this.seriesRepository.save(series);
  }

  async findAllByUser(user: User, filters: any, order: any): Promise<Series[]> {
    const query = this.seriesRepository.createQueryBuilder('series');

    query.where('series.userId = :userId', { userId: user.id });

    // Filtros
    if (filters.genre) {
      query.andWhere('series.genre = :genre', { genre: filters.genre });
    }
    if (filters.status) {
      query.andWhere('series.status = :status', { status: filters.status });
    }
    if (filters.priority) {
      query.andWhere('series.priority = :priority', {
        priority: filters.priority,
      });
    }

    // Ordenação
    if (order.by === 'name') {
      query.orderBy('series.title', order.direction || 'ASC');
    } else if (order.by === 'releaseDate') {
      query.orderBy('series.releaseDate', order.direction || 'ASC');
    }
    // Exemplo de "progresso" poderia ser calculado via subconsulta ou associação com episódios

    return query.getMany();
  }

  async removeSeries(user: User, seriesId: string): Promise<void> {
    const series = await this.seriesRepository.findOne({
      where: { id: seriesId, user },
    });
    if (!series) {
      throw new NotFoundException('Série não encontrada');
    }
    await this.seriesRepository.remove(series);
  }
}
