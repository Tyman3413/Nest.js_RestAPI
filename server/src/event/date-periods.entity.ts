import { IsDate } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class DatePeriods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamptz')
  @IsDate()
  start_time: Date;

  @Column('timestamptz')
  @IsDate()
  end_time: Date;

  @ManyToOne(() => Event, (event) => event.date_periods)
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
