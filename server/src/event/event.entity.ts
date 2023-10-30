import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DatePeriods } from './date-periods';
import { Venue } from './venue.entity';

enum Status {
  ACTIVE = 'ACTIVE',
  POSTPONED = 'POSTPONED',
  APPROVED = 'APPROVED',
  UNAPPROVED = 'UNAPPROVED',
  SUSPENDED = 'SUSPENDED',
  REMOVED = 'REMOVED',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => DatePeriods, (eventPeriod) => eventPeriod.event)
  date_periods: DatePeriods[];

  @OneToOne(() => Venue)
  @JoinColumn()
  venue: Venue;

  @Column()
  thumbnail: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;
}
