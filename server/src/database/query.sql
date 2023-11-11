-- 1. Устанавливаем часовой пояс базы данных
ALTER DATABASE "Test" SET timezone = 'UTC';

-- 2. Заполнение таблицы Venue
INSERT INTO venue (name, country, state, city, time_zone, zip_code, address)
VALUES
   ('Cafe', 'USA', 'Nevada', 'Las-Vegas', 'America/Los_Angeles', '32415', 'Citrus Hills Ave'),
	('Convention Center', 'Canada', 'Ontario', 'Toronto', 'America/Toronto', '48732', 'Maple Street'),
	('Arena', 'Australia', 'New South Wales', 'Sydney', 'Australia/Sydney', '12345', 'Harbor View Drive'),
	('Exhibition Hall', 'UK', 'England', 'London', 'Europe/London', '56789', 'Bakers Lane'),
	('Conference Center', 'Germany', 'Bavaria', 'Munich', 'Europe/Berlin', '98765', 'Hofbräuhaus Platz'),
	('Meeting Space', 'France', 'Île-de-France', 'Paris', 'Europe/Paris', '34567', 'Champs-Élysées'),
	('Expo Venue', 'Japan', 'Tokyo', 'Tokyo', 'Asia/Tokyo', '65432', 'Sakura Street'),
	('Convention Hall', 'Spain', 'Catalonia', 'Barcelona', 'Europe/Madrid', '23456', 'Rambla de Catalunya'),
	('Trade Center', 'Brazil', 'São Paulo', 'São Paulo', 'America/Sao_Paulo', '87654', 'Avenida Paulista'),
	('Seminar Room', 'South Korea', 'Seoul', 'Seoul', 'Asia/Seoul', '54321', 'Gangnam Street'),
	('Theater', 'Mexico', 'Mexico City', 'Mexico City', 'America/Mexico_City', '65478', 'Avenida Insurgentes'),
	('Exhibition Center', 'Italy', 'Lombardy', 'Milan', 'Europe/Rome', '12346', 'Via Montenapoleone'),
	('Event Venue', 'China', 'Beijing', 'Beijing', 'Asia/Shanghai', '98765', 'Wangfujing Street'),
	('Conference Hall', 'Russia', 'Moscow', 'Moscow', 'Europe/Moscow', '87654', 'Tverskaya Street'),
	('Convention Space', 'South Africa', 'Gauteng', 'Johannesburg', 'Africa/Johannesburg', '56789', 'Sandton Drive'),
	('Expo Center', 'United Arab Emirates', 'Dubai', 'Dubai', 'Asia/Dubai', '43210', 'Sheikh Zayed Road'),
	('Seminar Hall', 'India', 'Maharashtra', 'Mumbai', 'Asia/Kolkata', '34567', 'Marine Drive'),
	('Meeting Venue', 'Argentina', 'Buenos Aires', 'Buenos Aires', 'America/Argentina/Buenos_Aires', '87654', 'Avenida Corrientes'),
	('Auditorium', 'Canada', 'Quebec', 'Montreal', 'America/Toronto', '78901', 'Sainte-Catherine Street'),
	('Exhibition Pavilion', 'Germany', 'North Rhine-Westphalia', 'Düsseldorf', 'Europe/Berlin', '23456', 'Königsallee')
;

-- 3. Заполнение таблицы Event
INSERT INTO event (name, description, "venueId", thumbnail, status)
VALUES
   ('Happy Birthday', 'description', 1, 'img8285391203', 'ACTIVE'),
   ('Summer Festival', 'description', 2, 'img9456782310', 'POSTPONED'),
   ('Tech Conference', 'description', 3, 'img7654321987', 'APPROVED'),
   ('Art Exhibition', 'description', 4, 'img1234567890', 'UNAPPROVED'),
   ('Music Concert', 'description', 5, 'img8901234567', 'SUSPENDED'),
   ('Food Fair', 'description', 6, 'img5432109876', 'REMOVED'),
   ('Film Screening', 'description', 7, 'img6789012345', 'ACTIVE'),
   ('Business Seminar', 'description', 8, 'img9876543210', 'POSTPONED'),
   ('Sports Event', 'description', 9, 'img2345678901', 'APPROVED'),
   ('Science Symposium', 'description', 10, 'img4567890123', 'UNAPPROVED'),
   ('Winter Wonderland', 'description', 11, 'img1234567890', 'ACTIVE'),
   ('Spring Carnival', 'description', 12, 'img9876543210', 'SUSPENDED'),
   ('Fall Fair', 'description', 13, 'img5678901234', 'ACTIVE'),
   ('Holiday Parade', 'description', 14, 'img4321098765', 'POSTPONED'),
   ('Cultural Expo', 'description', 15, 'img8765432109', 'ACTIVE'),
   ('Music Festival', 'description', 16, 'img7654321098', 'POSTPONED'),
   ('Food Truck Fair', 'description', 17, 'img2109876543', 'ACTIVE'),
   ('Art Exhibition', 'description', 18, 'img6543210987', 'POSTPONED'),
   ('Sports Tournament', 'description', 19, 'img0987654321', 'ACTIVE'),
   ('Tech Conference', 'description', 20, 'img3210987654', 'POSTPONED')
;

-- 4. Заполнение таблицы DatePeriods
INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-01 08:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-01 20:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  1
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 1;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-02 12:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-02 16:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  2
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 2;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-03 10:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-03 18:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  3
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 3;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-04 14:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-04 22:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  4
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 4;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-05 09:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-05 17:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  5
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 5;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-06 11:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-06 19:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  6
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 6;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-07 14:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-07 22:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  7
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 7;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-08 16:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-08 23:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  8
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 8;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-09 10:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-09 18:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  9
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 9;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-10 12:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-10 20:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  10
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 10;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-10 12:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-10 20:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  10
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 10;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-12 10:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-12 18:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  12
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 12;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-13 14:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-13 20:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  13
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 13;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-14 09:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-14 17:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  14
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 14;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-15 12:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-15 20:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  15
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 15;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-16 16:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-16 22:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  16
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 16;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-17 11:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-17 19:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  17
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 17;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-18 10:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-18 18:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  18
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 18;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-19 15:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-19 23:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  19
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 19;

INSERT INTO date_periods (start_time, end_time, "event_id")
SELECT
  ('2023-06-20 08:00:00' AT TIME ZONE venue.time_zone) AS start_time,
  ('2023-06-20 16:00:00' AT TIME ZONE venue.time_zone) AS end_time,
  20
FROM event
JOIN venue ON event."venueId" = venue.id
WHERE event.id = 20;