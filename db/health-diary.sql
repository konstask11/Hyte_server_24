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

-- Create a table for exercises
CREATE TABLE Exercises (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    exercise_date DATE NOT NULL,
    exercise_type VARCHAR(50) NOT NULL,
    duration_minutes INT,
    calories_burned INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create a table for tracking food consumption
CREATE TABLE FoodConsumption (
    consumption_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    consumption_date DATE NOT NULL,
    food_name VARCHAR(100) NOT NULL,
    calories INT,
    protein_g DECIMAL(5,2),
    carbohydrates_g DECIMAL(5,2),
    fat_g DECIMAL(5,2),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);



-- Inserting multiple user rows at once
INSERT INTO Users (username, password, email, user_level) VALUES
  ('johndoe', 'temp-pw-1', 'johndoe@example.com', 'regular'),
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');


-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2023-01-10 21:00:00'),
  (5, '2024-03-07', 'Stressed', 124.5, 8, 'Busy day, a bit stressed out', '2024-03-07 21:00:00');

-- Inserting multiple exercise entries
INSERT INTO Exercises (user_id, exercise_date, exercise_type, duration_minutes, calories_burned, notes, created_at) VALUES
  (1, '2024-01-10', 'Running', 30, 300, 'Morning jog', '2024-01-10 12:00:00'),
  (1, '2024-01-11', 'Weightlifting', 45, 200, 'Strength training', '2024-01-11 15:30:00'),
  (2, '2024-01-10', 'Yoga', 60, 150, 'Relaxing session', '2023-01-10 18:00:00'),
  (5, '2024-03-06', 'disc golf', 120, 600, 'one round of disc golf', '2023-10-12 15:30:00');

-- Inserting multiple food consumption entries
INSERT INTO FoodConsumption (user_id, consumption_date, food_name, calories, protein_g, carbohydrates_g, fat_g, notes, created_at) VALUES
  (1, '2024-01-10', 'Salmon and potatoes', 450, 30.0, 20.0, 15.0, 'Healthy dinner', '2024-01-10 19:00:00'),
  (1, '2024-01-11', 'steak with fries', 750, 40.5, 30.0, 25.0, 'Heavy lunch option', '2024-01-11 12:30:00'),
  (2, '2024-01-10', 'noodle soup', 400, 15.0, 25.0, 10.0, 'Delicious and semi light ', '2024-01-10 20:00:00'),
  (5, '2024-03-07', 'pasta', 400, 20.0, 35.0, 15.0, 'Healthy dinner ', '2024-03-07 12:00:00');
