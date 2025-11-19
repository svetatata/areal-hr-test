create database hr_tz_areal character set utf8mb4 collate utf8mb4_unicode_ci;
use hr_tz_areal;
set names utf8mb4;
create table otdels (
    id int primary key auto_increment,
    name varchar(100) not null unique
);

create table positions (
    id int primary key auto_increment,
    name varchar(100) not null unique
);

create table sotrudniki (
    id int primary key auto_increment,
    last_name varchar(100) not null,
    first_name varchar(100) not null,
    middle_name varchar(100) not null,
    birth date not null,
    passport varchar(10) not null,
    phone varchar(20) not null, 
    address text not null,
    otdel_id int not null,
    position_id int not null,
    salary decimal(10,2) not null,
    date_priema date not null,
    foreign key (otdel_id) references otdels(id),
    foreign key (position_id) references positions(id)
);

insert into otdels (name) values 
('IT'),
('HR'),
('Бухгалтерия'),
('Маркетинг');
insert into positions (name) values 
('Разработчик'),
('Менеджер'),
('Бухгалтер'),
('Маркетолог');
insert into sotrudniki 
(last_name, first_name, middle_name, birth, passport, phone, address, otdel_id, position_id, salary, date_priema) 
values 
('Кузина', 'Полина', 'Дмитриевна', '1985-05-15', '4510123456', '+7 (912) 345-67-89', 'г. Ярославль, ул. Ленина, д. 1', 1, 1, 120000, '2025-03-15'),
('Смирнова', 'Валерия', 'Марковна', '1990-08-22', '4510987654', '+7 (923) 456-78-90', 'г. Ярославль, ул. Чайковского, д. 25', 2, 2, 80000, '2025-06-10');