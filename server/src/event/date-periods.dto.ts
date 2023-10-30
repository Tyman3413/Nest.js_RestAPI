import { IsDate } from 'class-validator';

export class DatePeriodsDto {
  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;
}
