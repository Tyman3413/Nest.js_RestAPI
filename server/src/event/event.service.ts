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
import { DatePeriods } from './date-periods';
import { EventDto } from './event.dto';

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

  async getList(sort: string, range: string, filter: string) {
    const sortOptions = JSON.parse(sort);
    const rangeMatches = range.match(/\[(\d+),(\d+)\]/);
    const start = parseInt(rangeMatches[1], 10);
    const end = parseInt(rangeMatches[2], 10);
    const filterOptions = JSON.parse(filter);
    const startDate = filterOptions.start_date;
    // const startDate = filterOptions.start_date.replace(/(\d{2})$/, '+$1');

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

  async getOne(id: number) {
    const query = this.eventRepository
      .createQueryBuilder('event')
      .where('event.id = :id', { id })
      .leftJoinAndSelect('event.venue', 'venue')
      .leftJoinAndSelect('event.date_periods', 'date_periods');

    return query.getOne();
  }

  async getMany(filter: string) {
    const filterOptions = JSON.parse(filter);
    const { id } = filterOptions;

    if (!id || !Array.isArray(id)) {
      throw new BadRequestException('Invalid filter format.');
    }

    const events = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.date_periods', 'date_periods')
      .leftJoinAndSelect('event.venue', 'venue')
      .whereInIds(id)
      .getMany();

    return events;
  }

  async getManyReference(eventId: number) {
    const venues = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.venue', 'venue')
      .where('event.id = :eventId', { eventId })
      .getMany();

    return venues.map((event) => event.venue);
  }

  async create(createEventDto: EventDto) {
    // Создайте новый объект Event из CreateEventDto
    const newEvent = new Event();
    newEvent.name = createEventDto.name;
    newEvent.description = createEventDto.description;
    newEvent.thumbnail = createEventDto.thumbnail;
    newEvent.status = createEventDto.status;

    // Проверьте, предоставлены ли данные Venue
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

    // Проверьте, предоставлены ли данные DatePeriods
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

    return await this.eventRepository.save(newEvent);
  }

  async update(id: number, updateEventDto: EventDto) {
    const event = await this.eventRepository.findOne({ where: { id: id } });

    if (!event) {
      return null;
    }

    if (updateEventDto.name) {
      event.name = updateEventDto.name;
    }

    if (updateEventDto.description) {
      event.description = updateEventDto.description;
    }

    if (updateEventDto.thumbnail) {
      event.thumbnail = updateEventDto.thumbnail;
    }

    if (updateEventDto.status) {
      event.status = updateEventDto.status;
    }

    return this.eventRepository.save(event);
  }

  async delete(id: number) {
    const event = await this.eventRepository.findOne({
      where: { id: id },
      relations: ['date_periods', 'venue'],
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    if (event.date_periods) {
      await Promise.all(
        event.date_periods.map(async (datePeriod) => {
          await this.datePeriodsRepository.remove(datePeriod);
        }),
      );
    }

    // Удаление мероприятия
    await this.eventRepository.remove(event);

    // Удаление связанной записи в таблице Venue
    if (event.venue) {
      await this.venueRepository.remove(event.venue);
    }
  }
}
