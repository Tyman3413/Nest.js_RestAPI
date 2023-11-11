import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { VenueDto } from './venue.dto';
import { Venue } from './venue.entity';
import { DatePeriods } from './date-periods.entity';
import { EventDto } from './event.dto';
import { ResultEventDTO } from './event-result.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>,

    @InjectRepository(DatePeriods)
    private datePeriodsRepository: Repository<DatePeriods>,
  ) {}

  async getList(
    sort: string,
    range: string,
    filter: string,
  ): Promise<{ data: Event[] }> {
    const sortOptions = JSON.parse(sort);
    const rangeMatches = range.match(/\[(\d+),(\d+)\]/);
    const start = parseInt(rangeMatches[1], 10);
    const end = parseInt(rangeMatches[2], 10);
    const filterOptions = JSON.parse(filter);
    const startDate = filterOptions.start_date;

    const query = this.eventRepository.createQueryBuilder('event');

    query
      .leftJoinAndSelect('event.venue', 'venue')
      .leftJoinAndSelect('event.date_periods', 'date_periods');

    if (sortOptions && sortOptions.length === 2) {
      const [sortField, sortOrder] = sortOptions;
      query.orderBy(`event.${sortField}`, sortOrder);
    }

    if (filterOptions.start_date) {
      query.andWhere('date_periods.start_time >= :startDate', {
        startDate: startDate,
      });
    }

    const data = await query
      .skip(start)
      .take(end - start)
      .getMany();

    return {
      data,
    };
  }

  async getOne(id: number): Promise<{ data: Event }> {
    const data = await this.eventRepository
      .createQueryBuilder('event')
      .where('event.id = :id', { id })
      .leftJoinAndSelect('event.venue', 'venue')
      .leftJoinAndSelect('event.date_periods', 'date_periods')
      .getOne();

    return {
      data,
    };
  }

  async getMany(filter: string): Promise<{ data: Event[] }> {
    const filterOptions = JSON.parse(filter);
    const { id } = filterOptions;

    if (!id || !Array.isArray(id)) {
      throw new BadRequestException('Invalid filter format.');
    }

    const data = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.date_periods', 'date_periods')
      .leftJoinAndSelect('event.venue', 'venue')
      .whereInIds(id)
      .getMany();

    return {
      data,
    };
  }

  async getManyReference(eventId: number) {
    const venues = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.venue', 'venue')
      .where('event.id = :eventId', { eventId })
      .getMany();

    return venues.map((event) => event.venue);
  }

  async create(createEventDto: EventDto): Promise<{ data: ResultEventDTO }> {
    const newEvent = new Event();
    newEvent.name = createEventDto.name;
    newEvent.description = createEventDto.description;
    newEvent.thumbnail = createEventDto.thumbnail;
    newEvent.status = createEventDto.status;

    if (createEventDto.venue) {
      const venueDto: VenueDto = createEventDto.venue;
      const venue = new Venue();
      venue.name = venueDto.name;
      venue.country = venueDto.country;
      venue.state = venueDto.state;
      venue.city = venueDto.city;
      venue.time_zone = venueDto.time_zone;
      venue.zip_code = venueDto.zip_code;
      venue.address = venueDto.address;

      newEvent.venue = await this.venueRepository.save(venue);
    }

    if (createEventDto.date_periods && createEventDto.date_periods.length > 0) {
      newEvent.date_periods = [];
      for (const datePeriodDto of createEventDto.date_periods) {
        const datePeriod = new DatePeriods();
        datePeriod.start_time = datePeriodDto.start_time;
        datePeriod.end_time = datePeriodDto.end_time;
        newEvent.date_periods.push(
          await this.datePeriodsRepository.save(datePeriod),
        );
      }
    }

    const savedEvent = await this.eventRepository.save(newEvent);
    const resultEventDto = new ResultEventDTO(
      savedEvent.id,
      savedEvent.name,
      savedEvent.description,
      savedEvent.thumbnail,
      savedEvent.status,
      savedEvent.venue,
      savedEvent.date_periods,
    );

    return { data: resultEventDto };
  }

  async update(
    id: number,
    updateEventDto: EventDto,
  ): Promise<{ data: ResultEventDTO }> {
    const existingEvent = await this.eventRepository.findOne({
      where: { id: id },
    });

    existingEvent.name = updateEventDto.name || existingEvent.name;
    existingEvent.description =
      updateEventDto.description || existingEvent.description;
    existingEvent.thumbnail =
      updateEventDto.thumbnail || existingEvent.thumbnail;
    existingEvent.status = updateEventDto.status || existingEvent.status;

    const updatedEvent = await this.eventRepository.save(existingEvent);

    const resultEventDto = new ResultEventDTO(
      updatedEvent.id,
      updatedEvent.name,
      updatedEvent.description,
      updatedEvent.thumbnail,
      updatedEvent.status,
      updatedEvent.venue,
      updatedEvent.date_periods,
    );

    return { data: resultEventDto };
  }

  async delete(id: number): Promise<{ data: ResultEventDTO }> {
    const existingEvent = await this.eventRepository.findOne({
      where: { id: id },
      relations: ['date_periods', 'venue'],
    });

    if (!existingEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    const deletedEvent = { ...existingEvent };

    if (existingEvent.date_periods) {
      await Promise.all(
        existingEvent.date_periods.map(async (datePeriod) => {
          await this.datePeriodsRepository.remove(datePeriod);
        }),
      );
    }

    await this.eventRepository.remove(existingEvent);

    if (existingEvent.venue) {
      await this.venueRepository.remove(existingEvent.venue);
    }

    const resultEventDto = new ResultEventDTO(
      deletedEvent.id,
      deletedEvent.name,
      deletedEvent.description,
      deletedEvent.thumbnail,
      deletedEvent.status,
      deletedEvent.venue,
      deletedEvent.date_periods,
    );

    return { data: resultEventDto };
  }
}
