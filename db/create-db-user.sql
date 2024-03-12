CREATE USER 'healthuser'@'localhost' IDENTIFIED BY 'healthpassu';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'healthuser'@'localhost';
FLUSH PRIVILEGES;

CREATE USER 'healthUser'@'localhost' IDENTIFIED BY 'healthPassu';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'healthUser'@'localhost';
FLUSH PRIVILEGES;
