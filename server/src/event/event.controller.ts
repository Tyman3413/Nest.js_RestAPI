import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './event.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('events')
@ApiTags('RestAPI')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({
    summary: 'Get list of events with queries',
    tags: ['RestAPI'],
  })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'range', required: false })
  async getList(
    @Query('sort') sort: string = null,
    @Query('range') range: string = null,
    @Query('filter') filter: string,
  ) {
    if (!sort || !range) {
      return this.eventService.getMany(filter);
    }
    return await this.eventService.getList(sort, range, filter);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one event using id',
    tags: ['RestAPI'],
  })
  async getOne(@Param('id') id: number) {
    const result = await this.eventService.getOne(id);
    return result;
  }

  @Post()
  @ApiOperation({
    summary: 'Create new Event',
    tags: ['RestAPI'],
  })
  async create(@Body() createEventDto: EventDto) {
    return this.eventService.create(createEventDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update Event using id',
    tags: ['RestAPI'],
  })
  async update(@Param('id') id: number, @Body() updateEventDto: EventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Event using id',
    tags: ['RestAPI'],
  })
  async delete(@Param('id') id: number) {
    return this.eventService.delete(id);
  }
}
