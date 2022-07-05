alter user 'root'@'localhost' identified with mysql_native_password by '123456';

flush privileges;

drop database if exists budgetControl;
create database budgetControl char set UTF8;
use budgetControl;
select database();
create table users(
id int not null primary key auto_increment,
username varchar(120) not null,
usersurname varchar(120) not null,
email varchar(120) not null,
password varchar(120) not null,
balance int not null default 0,
create_at timestamp default now()
);

insert into users(username, usersurname, email,password, balance) values
('Ira','Pankiv','pankiv@gmail.com','123456',10000),
('Pavlo','Pavliv','pavliv@gmail.com','654321',100000),
('Ivan','Ivanov','ivanov@gmail.com','123456',990000);

SELECT * FROM users;
