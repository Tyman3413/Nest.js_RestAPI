# Nest.js RestAPI server

### It is necessary to implement REST API methods for managing events.

| Method | Request |
|-----|-----|
| getList | GET http://my.api.url/events?sort=["name","ASC"]&range=[0, 24]&filter={"start_date":""} |
| getOne | GET http://my.api.url/events/123 |
| getMany | GET http://my.api.url/events?filter={"id":[123,456,789]} |
| getManyReference | GET http://my.api.url/venues?filter={"event_id":345} |
| create | POST http://my.api.url/events |
| update | PUT http://my.api.url/events/123 |
| delete | DELETE http://my.api.url/events/123 |

### The event entity should contain the following fields:
1. Name
2. Description
3. Date periods in which the event takes place, for example
<br>16.06.2023 12:00 AM - 16.06.2023 04:00 PM
<br>17.06.2023 08:00 AM - 20.06.2023 8:00 PM
<br>One event can contain several date ranges. 
4. Venue event location(name, country, state, city, timezone, zip code, address). Сountry, state, city, and time zone should be loaded from the lists.
5. Thumbnail
6. Status (ACTIVE, POSTPONED, APPROVED, UNAPPROVED, SUSPENDED, REMOVED)

### Requirements
1. Use Node.js framework NestJS with TypeORM.
2. Select a database from Postgres or MySQL.
3. Need to have Swagger. The request body and Response schema must be present.
4. Install dependencies with npm.
5. All requested data should be validated(class-validator).
6. Consider the time zone, different countries and cities may have different time zones.
7. The result of the work performed should be a link to the git repository with a readme file.

## TechSpec
- Nest.js
- TypeORM
- PostgreSQL
- Swagger
- Class-Validator

## Installation
1. Clone the repository using `git clone`.
2. Choose server directory using `cd server`.
3. Install dependencies using `npm install`.

## Setup
1. Setup your typeorm configuration in `server/src/database/database.module.ts`
```bash
type: 'postgres',
host: 'localhost',
username: 'postgres', // ! Change
password: 'admin', // ! Change
database: 'Test', // ! Change
```
2. Perform first start
```bash
nest start
```
4. Terminate your server
5. Create SQL query using sql script in `server/src/database/query.sql`
6. Start your server again
7. Swagger link: `http://localhost:3000/api`
