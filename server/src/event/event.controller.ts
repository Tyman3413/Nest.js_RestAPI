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
import { ResultEventDTO } from './event-result.dto';

@Controller('events')
@ApiTags('RestAPI')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('list')
  @ApiOperation({
    summary: 'Get a list of events sorted in the specified way',
  })
  @ApiQuery({ name: 'sort', required: true })
  @ApiQuery({ name: 'range', required: true })
  @ApiQuery({ name: 'filter', required: true })
  async getList(
    @Query('sort') sort: string,
    @Query('range') range: string,
    @Query('filter') filter: string,
  ): Promise<{ data: ResultEventDTO[] }> {
    const result = this.eventService.getList(sort, range, filter);
    const dataDto = (await result).data.map(
      (event) =>
        new ResultEventDTO(
          event.id,
          event.name,
          event.description,
          event.thumbnail,
          event.status,
          event.venue,
          event.date_periods,
        ),
    );
    return { data: dataDto };
  }

  @Get('many')
  @ApiOperation({ summary: 'Get many activities with the given IDs' })
  @ApiQuery({ name: 'filter', required: true })
  async getMany(
    @Query('filter') filter: string,
  ): Promise<{ data: ResultEventDTO[] }> {
    const result = this.eventService.getMany(filter);
    const dataDto = (await result).data.map(
      (event) =>
        new ResultEventDTO(
          event.id,
          event.name,
          event.description,
          event.thumbnail,
          event.status,
          event.venue,
          event.date_periods,
        ),
    );
    return { data: dataDto };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one event using id',
    tags: ['RestAPI'],
  })
  async getOne(@Param('id') id: number): Promise<{ data: ResultEventDTO }> {
    const result = await this.eventService.getOne(id);
    const dataDto = new ResultEventDTO(
      result.data.id,
      result.data.name,
      result.data.description,
      result.data.thumbnail,
      result.data.status,
      result.data.venue,
      result.data.date_periods,
    );
    return { data: dataDto };
  }

  @Post()
  @ApiOperation({
    summary: 'Create new Event',
    tags: ['RestAPI'],
  })
  async create(
    @Body() createEventDto: EventDto,
  ): Promise<{ data: ResultEventDTO }> {
    const result = await this.eventService.create(createEventDto);
    const dataDto = new ResultEventDTO(
      result.data.id,
      result.data.name,
      result.data.description,
      result.data.thumbnail,
      result.data.status,
      result.data.venue,
      result.data.date_periods,
    );
    return { data: dataDto };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update Event using id',
    tags: ['RestAPI'],
  })
  async update(
    @Param('id') id: number,
    @Body() updateEventDto: EventDto,
  ): Promise<{ data: ResultEventDTO }> {
    const result = await this.eventService.update(id, updateEventDto);
    const dataDto = new ResultEventDTO(
      result.data.id,
      result.data.name,
      result.data.description,
      result.data.thumbnail,
      result.data.status,
      result.data.venue,
      result.data.date_periods,
    );

    return { data: dataDto };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Event using id',
    tags: ['RestAPI'],
  })
  async delete(@Param('id') id: number) {
    const result = await this.eventService.delete(id);
    const dataDto = new ResultEventDTO(
      result.data.id,
      result.data.name,
      result.data.description,
      result.data.thumbnail,
      result.data.status,
      result.data.venue,
      result.data.date_periods,
    );

    return { data: ResultEventDTO };
  }
}
