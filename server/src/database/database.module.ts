import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatePeriods } from 'src/event/date-periods';
import { EventController } from 'src/event/event.controller';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';
import { VenuesController } from 'src/event/venue.controller';
import { Venue } from 'src/event/venue.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres', // ! Change
      password: 'admin', // ! Change
      database: 'Test', // ! Change
      entities: [Venue, DatePeriods, Event],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Venue, DatePeriods, Event]),
  ],
  providers: [EventService],
  controllers: [EventController, VenuesController],
})
export class DatabaseModule {}
