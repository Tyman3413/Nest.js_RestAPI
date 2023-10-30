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
import { ApiQuery } from '@nestjs/swagger';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiQuery({ name: 'sort', required: false }) // Установите required в false для необязательных параметров
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
  async getOne(@Param('id') id: number) {
    const result = await this.eventService.getOne(id);
    return result;
  }

  @Post()
  async create(@Body() createEventDto: EventDto) {
    return this.eventService.create(createEventDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateEventDto: EventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.eventService.delete(id);
  }
}
