import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('venues')
@ApiTags('RestAPI')
export class VenuesController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({
    summary: 'Get many reference of Event (using Venue table)',
    tags: ['RestAPI'],
  })
  async getManyReference(@Query('filter') filter: string) {
    try {
      const filterOptions = JSON.parse(filter);
      const { event_id } = filterOptions;

      if (!event_id) {
        throw new BadRequestException('The "event_id" filter is missing.');
      }

      const venues = await this.eventService.getManyReference(event_id);

      return venues;
    } catch (error) {
      throw new BadRequestException('Invalid filter format.');
    }
  }
}
