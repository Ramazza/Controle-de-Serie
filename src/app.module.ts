import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SeriesModule } from './series/series.module';
import { EpisodesModule } from './episodes/episodes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Módulo de variáveis de ambiente (opcional, mas recomendado)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Conexão com banco de dados usando TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'controle_de_series',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // desativar em produção, preferir migrations
    }),
    UsersModule,
    SeriesModule,
    EpisodesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
