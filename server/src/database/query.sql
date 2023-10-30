-- 1. Заполнение таблицы Venue
INSERT INTO venue (name, country, state, city, time_zone, zip_code, address)
VALUES
   ('Cafe', 'USA', 'Nevada', 'Las-Vegas', 'UTC−7 PDT', '32415', 'Citrus Hills Ave'),
	('Convention Center', 'Canada', 'Ontario', 'Toronto', 'UTC−4 EDT', '48732', 'Maple Street'),
	('Arena', 'Australia', 'New South Wales', 'Sydney', 'UTC+10 AEST', '12345', 'Harbor View Drive'),
	('Exhibition Hall', 'UK', 'England', 'London', 'UTC+1 BST', '56789', 'Bakers Lane'),
	('Conference Center', 'Germany', 'Bavaria', 'Munich', 'UTC+2 CEST', '98765', 'Hofbräuhaus Platz'),
	('Meeting Space', 'France', 'Île-de-France', 'Paris', 'UTC+2 CEST', '34567', 'Champs-Élysées'),
	('Expo Venue', 'Japan', 'Tokyo', 'Tokyo', 'UTC+9 JST', '65432', 'Sakura Street'),
	('Convention Hall', 'Spain', 'Catalonia', 'Barcelona', 'UTC+2 CEST', '23456', 'Rambla de Catalunya'),
	('Trade Center', 'Brazil', 'São Paulo', 'São Paulo', 'UTC−3 BRT', '87654', 'Avenida Paulista'),
	('Seminar Room', 'South Korea', 'Seoul', 'Seoul', 'UTC+9 KST', '54321', 'Gangnam Street'),
	('Theater', 'Mexico', 'Mexico City', 'Mexico City', 'UTC−5 CDT', '65478', 'Avenida Insurgentes'),
	('Exhibition Center', 'Italy', 'Lombardy', 'Milan', 'UTC+2 CEST', '12346', 'Via Montenapoleone'),
	('Event Venue', 'China', 'Beijing', 'Beijing', 'UTC+8 CST', '98765', 'Wangfujing Street'),
	('Conference Hall', 'Russia', 'Moscow', 'Moscow', 'UTC+3 MSK', '87654', 'Tverskaya Street'),
	('Convention Space', 'South Africa', 'Gauteng', 'Johannesburg', 'UTC+2 SAST', '56789', 'Sandton Drive'),
	('Expo Center', 'United Arab Emirates', 'Dubai', 'Dubai', 'UTC+4 GST', '43210', 'Sheikh Zayed Road'),
	('Seminar Hall', 'India', 'Maharashtra', 'Mumbai', 'UTC+5:30 IST', '34567', 'Marine Drive'),
	('Meeting Venue', 'Argentina', 'Buenos Aires', 'Buenos Aires', 'UTC−3 ART', '87654', 'Avenida Corrientes'),
	('Auditorium', 'Canada', 'Quebec', 'Montreal', 'UTC−4 EDT', '78901', 'Sainte-Catherine Street'),
	('Exhibition Pavilion', 'Germany', 'North Rhine-Westphalia', 'Düsseldorf', 'UTC+2 CEST', '23456', 'Königsallee')
;

-- 2. Заполнение таблицы Event
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

-- 3. Заполнение таблицы DatePeriods
INSERT INTO date_periods (start_time, end_time, "event_id")
VALUES
   ('2023-06-01 08:00:00', '2023-06-01 20:00:00', 1),
   ('2023-06-02 12:00:00', '2023-06-02 16:00:00', 2),
   ('2023-06-03 08:00:00', '2023-06-03 20:00:00', 3),
   ('2023-06-04 12:00:00', '2023-06-04 16:00:00', 4),
   ('2023-06-05 08:00:00', '2023-06-05 20:00:00', 5),
   ('2023-06-06 12:00:00', '2023-06-06 16:00:00', 6),
   ('2023-06-07 08:00:00', '2023-06-07 20:00:00', 7),
   ('2023-06-08 12:00:00', '2023-06-08 16:00:00', 8),
   ('2023-06-09 08:00:00', '2023-06-09 20:00:00', 9),
   ('2023-06-10 12:00:00', '2023-06-10 16:00:00', 10),
   ('2023-06-11 08:00:00', '2023-06-11 20:00:00', 11),
   ('2023-06-12 12:00:00', '2023-06-12 16:00:00', 12),
   ('2023-06-13 08:00:00', '2023-06-13 20:00:00', 13),
   ('2023-06-14 12:00:00', '2023-06-14 16:00:00', 14),
   ('2023-06-15 08:00:00', '2023-06-15 20:00:00', 15),
   ('2023-06-16 12:00:00', '2023-06-16 16:00:00', 16),
   ('2023-06-17 08:00:00', '2023-06-17 20:00:00', 17),
   ('2023-06-18 12:00:00', '2023-06-18 16:00:00', 18),
   ('2023-06-19 08:00:00', '2023-06-19 20:00:00', 19),
   ('2023-06-20 12:00:00', '2023-06-20 16:00:00', 20),
   ('2023-06-21 08:00:00', '2023-06-21 20:00:00', 1),
   ('2023-06-22 12:00:00', '2023-06-22 16:00:00', 2),
   ('2023-06-23 08:00:00', '2023-06-23 20:00:00', 3),
   ('2023-06-24 12:00:00', '2023-06-24 16:00:00', 4),
   ('2023-06-25 08:00:00', '2023-06-25 20:00:00', 5),
   ('2023-06-26 12:00:00', '2023-06-26 16:00:00', 6),
   ('2023-06-27 08:00:00', '2023-06-27 20:00:00', 7),
   ('2023-06-28 12:00:00', '2023-06-28 16:00:00', 8),
   ('2023-06-29 08:00:00', '2023-06-29 20:00:00', 9),
   ('2023-06-30 12:00:00', '2023-06-30 16:00:00', 10)
;
