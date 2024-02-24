CREATE USER 'healthuser'@'localhost' IDENTIFIED BY 'healthpassu';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'healthuser'@'localhost';
FLUSH PRIVILEGES;

