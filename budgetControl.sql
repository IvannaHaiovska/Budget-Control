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
('Pavlo','Pavliv','pavliv@gmail.com','654321',8000, 5000, 2000),
('Ivan','Ivanov','ivanov@gmail.com','123456',9900,7000, 1000);

SELECT * FROM users;

create table savings(
id int not null primary key auto_increment,
name varchar(120) not null,
sum int not null default 0,
users_id int not null,
create_at timestamp default now()
);

alter table savings add foreign key (users_id) references users(id);

insert into savings(name, sum, users_id, create_at) values
('bank',1500,1, '2022-01-05'),
('certificates of deposit',1500,1, '2022-01-12'),
('cash',600,1, '2022-02-15'),
('cash',500,1, '2022-03-08'),
('bank',1500,1, '2022-04-13'),
('certificates of deposit',1500,1, '2022-04-12'),
('cash',500,1, '2022-05-12'),
('cash',500,1, '2022-06-11'),
('bank',1500,1, '2022-06-17'),
('bank',1500,1, '2022-07-01'),
('certificates of deposit',1500,1, '2022-07-12'),
('cash',500,1, '2022-08-11'),
('bank',1500,1, '2022-08-17'),
('cash',500,1, '2022-09-11'),
('bank',1500,1, '2022-09-17'),
('cash',500,1,default),
('bank',500,1,default),
('bank',500,2, '2022-01-23'),
('cash',1600,2, '2022-02-09'),
('cash',500,2, '2022-03-04'),
('bank',1500,2, '2022-04-13'),
('bank',500,2, '2022-05-08'),
('certificates of deposit',1500,2, '2022-05-12'),
('cash',500,2, '2022-05-13'),
('cash',500,2, '2022-06-11'),
('bank',1500,2, '2022-06-13'),
('certificates of deposit',1500,2, '2022-06-12'),
('bank',1500,2, '2022-07-04'),
('bank',1500,2, '2022-08-04'),
('bank',1500,2, '2022-09-04'),
('bank',1500,2, '2022-09-04'),
('cash',500,2,default),
('bank',500,2,default),
('bank',500,3, '2022-01-11'),
('cash',1600,3, '2022-02-19'),
('certificates of deposit',500,3, '2022-02-12'),
('cash',500,3, '2022-03-18'),
('bank',2000,3, '2022-04-03'),
('bank',500,3, '2022-05-15'),
('certificates of deposit',1500,3, '2022-05-12'),
('cash',500,3, '2022-06-11'),
('bank',1000,3, '2022-06-18'),
('bank',3000,3, '2022-07-04'),
('bank',400,3, '2022-08-04'),
('cash',500,3, '2022-09-24'),
('bank',1500,3, '2022-09-11'),
('cash',500,3,default),
('bank',500,3,default);

SELECT * FROM savings;

create table spends(
id int not null primary key auto_increment,
name varchar(120) not null,
sum int not null default 0,
users_id int not null,
create_at timestamp default now()
);

alter table spends add foreign key (users_id) references users(id);

insert into spends(name, sum, users_id,create_at) values
('rent',500,1, '2022-01-15'),
('birthday gift',200,1, '2022-01-15'),
('energy',500,1, '2022-01-15'),
('girlfriend',100,1, '2022-01-15'),
('food',100, 1, '2022-02-27'),
('rent',500, 1, '2022-02-27'),
('clothes',200, 1, '2022-02-27'),
('rent',500,1, '2022-03-11'),
('food',900, 1, '2022-03-15'),
('pet',500,1, '2022-03-11'),
('movies',100, 1, '2022-03-15'),
('girlfriend',500,1, '2022-03-11'),
('energy',900, 1, '2022-03-15'),
('rent',1500,1, '2022-04-13'),
('food',1500,1, '2022-04-13'),
('energy',1500,1, '2022-04-13'),
('rent',300,1, '2022-05-15'),
('utilities',300,1, '2022-05-15'),
('energy',1500,1, '2022-06-17'),
('rent',500,1, '2022-06-17'),
('food',500,1, '2022-06-17'),
('clothes',1500,1, '2022-06-17'),
('energy',500,1, '2022-07-11'),
('rent',500,1, '2022-07-11'),
('birthday gift',500,1, '2022-07-11'),
('food',500,1, '2022-07-11'),
('rent',500,1, '2022-08-11'),
('birthday gift',500,1, '2022-08-11'),
('food',500,1, '2022-08-11'),
('rent',500,1, '2022-09-11'),
('birthday gift',500,1, '2022-09-11'),
('food',500,1, '2022-09-11'),
('girlfriend',500,1,default),
('food',500,1,default),
('rent',500,2, '2022-01-15'),
('birthday gift',200,2, '2022-01-15'),
('energy',500,2, '2022-01-15'),
('girlfriend',100,2, '2022-01-15'),
('food',100, 2, '2022-02-27'),
('rent',500, 2, '2022-02-27'),
('clothes',200, 2, '2022-02-27'),
('rent',500,2, '2022-03-11'),
('food',900, 2, '2022-03-15'),
('pet',500,2, '2022-03-11'),
('movies',100, 2, '2022-03-15'),
('girlfriend',500,2, '2022-03-11'),
('energy',900, 2, '2022-03-15'),
('rent',1500,2, '2022-04-13'),
('food',1500,2, '2022-04-13'),
('energy',1500,2, '2022-04-13'),
('rent',300,2, '2022-05-15'),
('utilities',300,2, '2022-05-15'),
('energy',1500,2, '2022-06-17'),
('rent',500,2, '2022-06-17'),
('food',500,2, '2022-06-17'),
('clothes',1500,2, '2022-06-17'),
('energy',500,2, '2022-07-11'),
('rent',500,2, '2022-07-11'),
('birthday gift',500,2, '2022-07-11'),
('food',500,2, '2022-07-11'),
('rent',500,2, '2022-08-11'),
('birthday gift',500,2, '2022-08-11'),
('food',500,2, '2022-08-11'),
('rent',500,2, '2022-09-11'),
('birthday gift',500,2, '2022-09-11'),
('food',500,2, '2022-09-11'),
('girlfriend',500,2,default),
('food',500,2,default),
('rent',500,3, '2022-01-15'),
('birthday gift',200,3, '2022-01-15'),
('energy',500,3, '2022-01-15'),
('girlfriend',100,3, '2022-01-15'),
('food',100, 3, '2022-02-27'),
('rent',500, 3, '2022-02-27'),
('clothes',200, 3, '2022-02-27'),
('rent',500,3, '2022-03-11'),
('food',900, 3, '2022-03-15'),
('pet',500,3, '2022-03-11'),
('movies',100, 3, '2022-03-15'),
('girlfriend',500,3, '2022-03-11'),
('energy',900, 3, '2022-03-15'),
('rent',1500,3, '2022-04-13'),
('food',1100,3, '2022-04-13'),
('energy',2500,3, '2022-04-13'),
('rent',300,3, '2022-05-15'),
('utilities',200,3, '2022-05-15'),
('energy',1500,3, '2022-06-17'),
('rent',600,3, '2022-06-17'),
('food',500,3, '2022-06-17'),
('clothes',1200,3, '2022-06-17'),
('energy',700,3, '2022-07-11'),
('rent',1500,3, '2022-07-11'),
('birthday gift',500,3, '2022-07-11'),
('food',200,3, '2022-07-11'),
('rent',500,3, '2022-08-11'),
('birthday gift',1000,3, '2022-08-11'),
('food',400,3, '2022-08-11'),
('rent',1500,3, '2022-09-11'),
('birthday gift',500,3, '2022-09-11'),
('food',300,3, '2022-09-11'),
('girlfriend',1500,3,default),
('food',500,3,default);


SELECT * FROM spends;

create table history(
id int not null primary key auto_increment,
category varchar(120) not null,
sum int not null default 0,
users_id int not null,
create_at timestamp default now()
);

alter table history add foreign key (users_id) references users(id);

insert into history(category, sum, users_id, create_at) values
('income',5000, 1, '2020-01-22'),
('saving (bank)',1500,1, '2020-01-15'),
('spend (girlfriend)',500,1, '2020-01-12'),
('income',6000,1, '2020-02-09'),
('saving (cash)',600,1, '2020-02-27'),
('spend (food)',2500, 1, '2020-02-19'),
('income',3000,1, '2020-03-08'),
('saving (cash)',500,1, '2020-03-29'),
('spend (rent)',500,1, '2020-03-06'),
('spend (food)',900, 1, '2020-03-14'),
('income',1000,1, '2020-04-06'),
('saving (bank)',1500,1, '2020-04-28'),
('spend (rent)',500,1, '2020-04-09'),
('income',5000,1, '2020-05-19'),
('saving (bank)',500, 1, '2020-05-08'),
('saving (cash)',500,1, '2020-05-21'),
('spend (girlfriend)',500,1, '2020-05-18'),
('income',5000,1, '2020-06-08'),
('saving (cash)',500,1, '2020-06-15'),
('saving (bank)',1500,1, '2020-06-24'),
('spend (utilities)',300, 1, '2020-06-13'),
('income',10000,1, '2020-07-15'),
('saving (bank)',1500,1, '2020-07-26'),
('spend (rent)',500,1, '2020-07-03'),
('income',50000,1, '2020-08-23'),
('saving (cash)',300,1, '2020-08-07'),
('spend (food)',2500,1, '2020-08-15'),
('income',3000,1, '2020-09-02'),
('saving (cash)',500,1, '2020-09-11'),
('spend (utilities)',500,1, '2020-09-25'),
('spend (food)',100, 1, '2020-09-29'),
('income',5000,1, '2020-10-02'),
('saving (bank)',1500,1, '2020-10-17'),
('spend (utilities)',500,1, '2020-10-25'),
('income',5000,1, '2020-11-27'),
('saving (bank)',2500,1, '2020-11-11'),
('saving (certificates of deposit)',300,1, '2020-11-02'),
('spend (utilities)',900,1, '2020-11-18'),
('spend (food)',2500, 1, '2020-11-30'),
('income',2000,1, '2020-12-07'),
('saving (certificates of deposit)',1500,1, '2020-12-12'),
('saving (cash)',1500,1, '2020-12-21'),
('income',5000,2, '2020-01-25'),
('saving (bank)',500,2, '2020-01-18'),
('spend (girlfriend)',100,2, '2020-01-15'),
('income',6000,2, '2020-02-23'),
('saving (cash)',1600,2, '2020-02-14'),
('spend (food)',2500, 2, '2020-02-09'),
('income',3000,2, '2020-03-28'),
('saving (cash)',500,2, '2020-03-06'),
('spend (rent)',700,2, '2020-03-14'),
('spend (food)',900, 2, '2020-03-21'),
('income',1000,2, '2020-04-24'),
('saving (bank)',1500,2, '2020-04-06'),
('spend (food)',2500, 2, '2020-04-09'),
('income',5000,2, '2020-05-18'),
('saving (cash)',500,2, '2020-05-02'),
('spend (girlfriend)',500,2, '2020-05-12'),
('income',5000,2, '2020-06-03'),
('saving (cash)',500,2, '2020-06-18'),
('saving (bank)',1500,2, '2020-06-12'),
('spend (rent)',500,2, '2020-06-03'),
('income',10000,2, '2020-07-15'),
('saving (bank)',1500,2, '2020-07-24'),
('spend (rent)',500,2, '2020-07-03'),
('income',50000,2, '2020-08-28'),
('saving (cash)',300,2, '2020-08-15'),
('spend (food)',2500, 2, '2020-08-09'),
('income',3000,2, '2020-09-29'),
('saving (cash)',500,2, '2020-09-14'),
('spend (utilities)',500,2, '2020-09-25'),
('spend (food)',100,  2, '2020-09-08'),
('income',5000,2, '2020-10-13'),
('saving (bank)',1500,2, '2020-10-25'),
('income',5000,2, '2020-11-13'),
('saving (certificates of deposit)',300,2, '2020-11-05'),
('spend (utilities)',900,2, '2020-11-27'),
('income',2000,2, '2020-12-21'),
('saving (certificates of deposit)',1500,2, '2020-12-07'),
('saving (cash)',1500,2, '2020-12-13'),
('income',5000,3, '2020-01-15'),
('saving (bank)',500,3, '2020-01-02'),
('spend (girlfriend)',100,3, '2020-01-12'),
('income',6000,3, '2020-02-21'),
('saving (cash)',1600,3, '2020-02-15'),
('spend (food)',2500,  3, '2020-02-09'),
('income',3000,3, '2020-03-30'),
('saving (cash)',500,3, '2020-03-06'),
('spend (rent)',700,3, '2020-03-16'),
('spend (food)',900, 3, '2020-03-22'),
('income',1000,3, '2020-04-25'),
('saving (bank)',1500,3, '2020-04-06'),
('spend (rent)',700,3, '2020-04-16'),
('income',5000,3, '2020-05-19'),
('saving (bank)',500, 3, '2020-05-18'),
('saving (cash)',500,3, '2020-05-08'),
('spend (girlfriend)',500,3, '2020-05-12'),
('spend (utilities)',300, 3, '2020-05-24'),
('income',5000,3, '2020-06-29'),
('saving (bank)',1500,3, '2020-06-05'),
('saving (cash)',500,3, '2020-06-18'),
('income',10000,3, '2020-07-12'),
('saving (bank)',1500,3, '2020-07-28'),
('spend (rent)',500,3, '2020-07-03'),
('income',50000,3, '2020-08-22'),
('saving (cash)',300,3, '2020-08-09'),
('spend (food)',2500, 3, '2020-08-15'),
('income', 3000, 3, '2020-09-11'),
('saving (cash)',500,3, '2020-09-22'),
('spend (utilities)',500,3, '2020-09-25'),
('spend (food)',100, 3, '2020-09-16'),
('income',5000,3, '2020-10-02'),
('saving (bank)',1500,3, '2020-10-11'),
('spend (utilities)',500,3, '2020-10-25'),
('income',5000,3, '2020-11-04'),
('saving (bank)',2500,  3, '2020-11-30'),
('saving (certificates of deposit)',300,3, '2020-11-18'),
('spend (utilities)',900,3, '2020-11-27'),
('spend (food)',2500,3, '2020-11-17'),
('income',2000,3, '2020-12-03'),
('saving (certificates of deposit)',1500,3, '2020-12-17'),
('saving (cash)',1500,3, '2020-12-21'),
('income',5000,1, '2021-01-28'),
('saving (bank)',1500,1, '2021-01-23'),
('spend (girlfriend)',500,1, '2021-01-11'),
('income',6000,1, '2021-02-09'),
('saving (cash)',600,1, '2021-02-16'),
('spend (food)',2500, 1, '2021-02-28'),
('income',3000,1, '2021-03-16'),
('saving (cash)',500,1, '2021-03-23'),
('spend (rent)',500,1, '2021-03-11'),
('spend (food)',900, 1, '2021-03-07'),
('income',1000,1, '2021-04-24'),
('saving (bank)',1500,1, '2021-04-08'),
('spend (rent)',500,1, '2021-04-11'),
('income',5000,1, '2021-05-21'),
('saving (cash)',500,1, '2021-05-19'),
('spend (girlfriend)',500,1, '2021-05-10'),
('income',5000,1, '2021-06-24'),
('saving (bank)',1500,1, '2021-06-03'),
('saving (cash)',500,1, '2021-06-16'),
('income',10000,1, '2021-07-05'),
('saving (bank)',1500,1, '2021-07-24'),
('spend (rent)',500,1, '2021-07-18'),
('income',50000,1, '2021-08-26'),
('saving (cash)',300,1, '2021-08-19'),
('spend (food)',2500,1, '2021-08-02'),
('income',3000,1, '2021-09-14'),
('saving (cash)',500,1, '2021-09-21'),
('spend (utilities)',500,1, '2021-09-03'),
('spend (food)',100, 1, '2021-09-30'),
('income',5000,1, '2021-10-28'),
('saving (bank)',1500,1, '2021-10-11'),
('spend (food)',100, 1, '2021-10-30'),
('income',5000,1, '2021-11-29'),
('saving (bank)',2500,1, '2021-11-05'),
('spend (utilities)',900,1, '2021-11-12'),
('spend (food)',2500, 1, '2021-11-23'),
('income',2000,1, '2021-12-30'),
('saving (cash)',1500,1, '2021-12-05'),
('saving (certificates of deposit)',1500,1, '2021-12-17'),
('income',5000,2, '2021-01-21'),
('saving (bank)',500,2, '2021-01-11'),
('spend (girlfriend)',100,2, '2021-01-12'),
('income',6000,2, '2021-02-09'),
('saving (cash)',1600,2, '2021-02-13'),
('spend (food)',2500, 2, '2021-02-06'),
('income',3000,2, '2021-03-17'),
('saving (cash)',500,2, '2021-03-21'),
('spend (rent)',700,2, '2021-03-07'),
('income',1000,2, '2021-04-24'),
('saving (bank)',1500,2, '2021-04-08'),
('spend (utilities)',300, 2, '2021-04-15'),
('income',5000,2, '2021-05-28'),
('saving (bank)',500,2, '2021-05-10'),
('saving (cash)',500,2, '2021-05-25'),
('spend (utilities)',300, 2, '2021-05-15'),
('income',5000,2, '2021-06-29'),
('saving (cash)',500,2, '2021-06-16'),
('saving (bank)',1500,2, '2021-06-19'),
('income',10000,2, '2021-07-02'),
('saving (bank)',1500,2, '2021-07-18'),
('spend (rent)',500,2, '2021-07-10'),
('income',50000,2, '2021-08-25'),
('saving (cash)',300,2, '2021-08-19'),
('spend (food)',2500, 2, '2021-08-02'),
('income',3000,2, '2021-09-13'),
('saving (cash)',500,2, '2021-09-05'),
('spend (utilities)',500,2, '2021-09-21'),
('spend (food)',100, 2, '2021-09-24'),
('income',5000,2, '2021-10-28'),
('saving (bank)',1500,2, '2021-10-11'),
('income',5000,2, '2021-11-27'),
('saving (bank)',2500,  2, '2021-11-09'),
('saving (certificates of deposit)',300,2, '2021-11-18'),
('spend (food)',2500, 2, '2021-11-12'),
('income',2000,2, '2021-12-29'),
('saving (cash)',1500,2, '2021-12-17'),
('saving (certificates of deposit)',1500,2, '2021-12-15'),
('income',5000,3, '2021-01-21'),
('saving (bank)',500,3, '2021-01-04'),
('spend (girlfriend)',100,3, '2021-01-11'),
('income',6000,3, '2021-02-19'),
('saving (cash)',1600,3, '2021-02-23'),
('spend (food)',2500,3, '2021-02-09'),
('income',3000,3, '2021-03-13'),
('saving (cash)',500,3, '2021-03-07'),
('spend (rent)',700,3, '2021-03-26'),
('income',1000,3, '2021-04-08'),
('saving (bank)',1500,3, '2021-04-13'),
('spend (rent)',700,3, '2021-04-26'),
('income',5000,3, '2021-05-15'),
('saving (bank)',500, 3, '2021-05-27'),
('spend (girlfriend)',500,3, '2021-05-16'),
('spend (utilities)',300, 3, '2021-05-10'),
('income',5000,3, '2021-06-27'),
('saving (cash)',500,3, '2021-06-16'),
('saving (bank)',1500,3, '2021-06-30'),
('income',10000,3, '2021-07-01'),
('saving (bank)',1500,3, '2021-07-30'),
('spend (rent)',500,3, '2021-07-18'),
('income',50000,03, '2021-08-19'),
('saving (cash)',300,3, '2021-08-23'),
('spend (food)',2500, 3, '2021-08-14'),
('income',3000,3, '2021-09-21'),
('saving (cash)',500,3, '2021-09-14'),
('spend (food)',100, 3, '2021-09-25'),
('income',5000,3, '2021-10-12'),
('saving (bank)',1500,3, '2021-10-28'),
('income',5000,3, '2021-11-14'),
('saving (bank)',2500, 3, '2021-11-09'),
('saving (certificates of deposit)',300,3, '2021-11-28'),
('spend (utilities)',900,3, '2021-11-12'),
('spend (food)',2500, 3, '2021-11-25'),
('income',2000,3, '2021-12-06'),
('saving (cash)',1500,3, '2021-12-17'),
('saving (certificates of deposit)',1500,3, '2021-12-23'),
('income',5000,1, '2022-01-18'),
('saving (bank)',1500,1, '2022-01-05'),
('spend (girlfriend)',500,1, '2022-01-15'),
('income',6000,1, '2022-02-19'),
('saving (cash)',600,1, '2022-02-15'),
('spend (food)',2500, 1, '2022-02-27'),
('income',3000,1, '2022-03-21'),
('saving (cash)',500,1, '2022-03-08'),
('spend (rent)',500,1, '2022-03-11'),
('spend (food)',900, 1, '2022-03-15'),
('income',1000,1, '2022-04-21'),
('saving (bank)',1500,1, '2022-04-13'),
('income',5000,1, '2022-05-05'),
('saving (cash)',500,1, '2022-05-12'),
('spend (utilities)',300,1, '2022-05-15'),
('income',5000,1, '2022-06-28'),
('saving (cash)',500,1, '2022-06-11'),
('saving (bank)',1500,1, '2022-06-17'),
('income',10000,1, '2022-07-26'),
('saving (bank)',1500,1, '2022-07-01'),
('spend (rent)',500,1, '2022-07-11'),
('income',10000,1, '2022-08-26'),
('saving (bank)',1500,1, '2022-08-01'),
('spend (rent)',500,1, '2022-08-11'),
('income',5000,2, '2022-01-05'),
('saving (bank)',500,2, '2022-01-23'),
('spend (girlfriend)',100,2, '2022-01-15'),
('income',6000,2, '2022-02-15'),
('saving (cash)',1600,2, '2022-02-09'),
('spend (food)',2500, 2, '2022-02-26'),
('income',3000,2, '2022-03-26'),
('saving (cash)',500,2, '2022-03-04'),
('spend (rent)',700,2, '2022-03-11'),
('spend (food)',900, 2, '2022-03-19'),
('income',1000,2, '2022-04-23'),
('saving (bank)',1500,2, '2022-04-13'),
('income',5000,2, '2022-05-15'),
('saving (bank)',500,2, '2022-05-08'),
('saving (cash)',500,2, '2022-05-13'),
('spend (girlfriend)',500,2, '2022-05-15'),
('spend (utilities)',300,  2, '2022-05-24'),
('income',5000,2, '2022-06-28'),
('saving (cash)',500,2, '2022-06-11'),
('saving (bank)',1500,2, '2022-06-13'),
('income',10000,2, '2022-07-11'),
('saving (bank)',1500,2, '2022-07-04'),
('spend (rent)',500,2, '2022-07-23'),
('income',10000,2, '2022-08-11'),
('saving (bank)',1500,2, '2022-08-04'),
('spend (rent)',500,2, '2022-08-23'),
('income',5000,3, '2022-01-15'),
('saving (bank)',500,3, '2022-01-11'),
('spend (girlfriend)',100,3, '2022-01-07'),
('income',6000,3, '2022-02-23'),
('saving (cash)',1600,3, '2022-02-19'),
('spend (food)',2500, 3, '2022-02-15'),
('income',3000,3, '2022-03-11'),
('saving (cash)',500,3, '2022-03-18'),
('spend (rent)',700, 3, '2022-03-21'),
('spend (food)',900, 3, '2022-03-07'),
('income',1000,3, '2022-04-13'),
('saving (bank)',1500,3, '2022-04-03'),
('income',5000,3, '2022-05-27'),
('saving (bank)',500,3, '2022-05-15'),
('spend (girlfriend)',500,3, '2022-05-07'),
('spend (utilities)',300, 3, '2022-05-19'),
('income',5000,3, '2022-06-21'),
('saving (cash)',500,3, '2022-06-11'),
('saving (bank)',1500,3, '2022-06-18'),
('income',10000,3, '2022-07-27'),
('saving (bank)',1500,3, '2022-07-04'),
('spend (rent)',500,3, '2022-07-11'),
('income',10000,3, '2022-08-27'),
('saving (bank)',1500,3, '2022-08-04'),
('spend (rent)',500,3, '2022-08-11'),
('income',10000,3, '2022-09-27'),
('saving (bank)',1500,3, '2022-09-04'),
('spend (rent)',500,3, '2022-09-11'),
('income',10000,3, '2022-10-27');


 SELECT * FROM history;

