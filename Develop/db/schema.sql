create table departments (
    id integer auto_increment primary key not null,
    dept_name varchar(30) not null
);

create table roles (
    id integer auto_increment primary key not null,
    job_title varchar(60) not null,
    salary decimal(10,2) not null
);

create table employee (
    employee_id varchar(30) not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null
);

