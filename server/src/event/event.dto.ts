import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { DatePeriodsDto } from './date-periods.dto';
import { VenueDto } from './venue.dto';

enum Status {
  ACTIVE = 'ACTIVE',
  POSTPONED = 'POSTPONED',
  APPROVED = 'APPROVED',
  UNAPPROVED = 'UNAPPROVED',
  SUSPENDED = 'SUSPENDED',
  REMOVED = 'REMOVED',
}

export class EventDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsOptional()
  @IsDate({ each: true })
  date_periods: DatePeriodsDto[];

  @IsOptional()
  venue: VenueDto;
}
