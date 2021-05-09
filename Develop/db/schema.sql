create table departments (
    id integer auto_increment primary key not null,
    dept_name varchar(30) not null
);

create table roles (
    id integer auto_increment primary key not null,
    job_title varchar(60) not null,
    salary decimal(10,2) not null,
    dept_id integer,
    foreign key (dept_id)
    references departments(id)
);

create table employee (
    id integer auto_increment primary key not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer,
    foreign key (role_id),
    references roles(id)
);

