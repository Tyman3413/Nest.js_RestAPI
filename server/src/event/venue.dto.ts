import { IsString } from 'class-validator';

export class VenueDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  time_zone: string;

  @IsString()
  zip_code: string;

  @IsString()
  address: string;
}
