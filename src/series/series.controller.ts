import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('series')
@UseGuards(JwtAuthGuard)
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Post()
  async addSeries(
    @Req() req: Request,
    @Body('title') title: string,
    @Body('genre') genre: string,
    @Body('status') status: string,
    @Body('priority') priority: number,
    @Body('releaseDate') releaseDate: Date,
  ) {
    const user = { id: req.user!['id'] }; // ou buscar no DB
    return this.seriesService.addSeries(
      user as any,
      title,
      genre,
      status,
      priority,
      releaseDate,
    );
  }

  @Get()
  async listSeries(
    @Req() req: Request,
    @Query('genre') genre?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: number,
    @Query('orderBy') orderBy?: string,
    @Query('orderDir') orderDir?: string,
  ) {
    const user = { id: req.user!['id'] }; // ou buscar no DB
    const filters = { genre, status, priority };
    const order = { by: orderBy, direction: orderDir };
    return this.seriesService.findAllByUser(user as any, filters, order);
  }

  @Delete(':id')
  async removeSeries(@Req() req: Request, @Param('id') id: string) {
    const user = { id: req.user!['id'] };
    return this.seriesService.removeSeries(user as any, id);
  }
}
