import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('series')
export class Series {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  genre: string; // drama, comédia, ação etc.

  @Column({ nullable: true })
  status: string; // em andamento, finalizada

  @Column({ nullable: true })
  priority: number; // prioridade de 1 a 5 (exemplo)

  @Column({ nullable: true })
  releaseDate: Date;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
