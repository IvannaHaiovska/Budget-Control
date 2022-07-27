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
expenses int not null default 0,
income int not null default 0,
imagePath varchar(220) default 'https://www.therconline.com/wp-content/uploads/2022/05/Does-Facebook-have-the-%E2%80%98New-Profile-Pic-feature-as-app-goes-viral-1.png',
create_at timestamp default now()
);

insert into users(username, usersurname, email,password, balance, expenses,income) values
('Ira','Pankiv','pankiv@gmail.com','123456',10000, 8000, 500),
('Pavlo','Pavliv','pavliv@gmail.com','654321',100000, 50000, 2000),
('Ivan','Ivanov','ivanov@gmail.com','123456',990000,70000, 1000);

SELECT * FROM users;

create table savings(
id int not null primary key auto_increment,
name varchar(120) not null,
sum int not null default 0,
users_id int not null,
create_at timestamp default now()
);

alter table savings add foreign key (users_id) references users(id);

insert into savings(name, sum, users_id) values
('cash',500,1),
('bank',500,1),
('cash',500,2),
('bank',500,2),
('cash',500,3),
('bank',500,3);

SELECT * FROM savings;

create table spends(
id int not null primary key auto_increment,
name varchar(120) not null,
sum int not null default 0,
users_id int not null,
create_at timestamp default now()
);

alter table spends add foreign key (users_id) references users(id);

insert into spends(name, sum, users_id) values
('girlfriend',500,1),
('food',500,1),
('girlfriend',500,2),
('food',500,2),
('girlfriend',500,3),
('food',500,3);

SELECT * FROM spends;

