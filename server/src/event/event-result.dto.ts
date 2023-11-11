export class ResultEventDTO {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly thumbnail: string;
  readonly status: string;
  readonly date_periods: {
    readonly id: number;
    readonly start_time: Date;
    readonly end_time: Date;
  };
  readonly venue: {
    readonly id: number;
    readonly name: string;
    readonly country: string;
    readonly state: string;
    readonly city: string;
    readonly time_zone: string;
    readonly zip_code: string;
    readonly address: string;
  };

  constructor(
    id: number,
    name: string,
    description: string,
    thumbnail: string,
    status: string,
    venue: any,
    date_periods: any,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;
    this.status = status;
    this.venue = venue;
    this.date_periods = date_periods;
  }
}
