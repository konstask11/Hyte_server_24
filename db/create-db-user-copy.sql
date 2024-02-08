CREATE USER 'healthuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `DATABASE`.* TO 'healthuser'@'localhost';
FLUSH PRIVILEGES;
