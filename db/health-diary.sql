DROP DATABASE IF EXISTS HealthDiary;

CREATE DATABASE HealthDiary;
USE HealthDiary;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) NOT NULL DEFAULT 'regular'
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create a table for
CREATE TABLE Moved_Hours (
    HourID INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    Day DATE,
    Duration INT, -- Duration in minutes
    Sport VARCHAR(50),
    MaxHR INT,
    MinHR INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- INSERT users
-- Iserting multiple user rows at once
INSERT INTO Users (username, password, email, user_level) VALUES
    ('johndoe', 'temp-pw-1', 'johndoe@example.com', 'regular'),
    ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
    ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');

-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00');

-- Esimerkki tietojen lisäämisestä
INSERT INTO Moved_Hours (user_id, day, Duration, Sport, MaxHR, MinHR)
VALUES (1, '2024-02-05', 60, 'Juoksu', 180, 90);

INSERT INTO Moved_Hours (user_id, day, Duration, Sport, MaxHR, MinHR)
VALUES (2, '2024-02-06', 45, 'Pyöräily', 160, 80);


UPDATE Users SET user_level = 'admin' WHERE user_id = 1;

DELETE FROM Moved_Hours
WHERE HourID = 1;

SELECT Users.username, Moved_Hours.Day, Moved_Hours.Duration, Moved_Hours.Sport
FROM Users
INNER JOIN Moved_Hours ON Users.user_id = Moved_Hours.user_id;

+--------------+       +----------------+      +--------------+
|    Users     |       | DiaryEntries   |      | Moved_Hours  |
+--------------+       +----------------+      +--------------+
| user_id (PK) |<------| entry_id (PK)  |<-----| HourID (PK)  |
| username     |       | user_id (FK)   |      | user_id (FK) |
| password     |       | entry_date     |      | Day          |
| email        |       | mood           |      | Duration     |
| created_at   |       | weight         |      | Sport        |
| user_level   |       | sleep_hours    |      | MaxHR        |
+--------------+       | notes          |      | MinHR        |
                       | created_at     |      +--------------+
                       +----------------+
