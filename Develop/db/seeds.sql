insert into departments (dept_name) 
    values ('Customer Service'), 
    ('Technology'),
    ('Human Resources'),
    ('Marketing'),
    ('Operations'),
    ('Finance'),
    ('Sales');

insert into roles (job_title, salary, dept_id)
values ('Customer Service Representative', 25000, 1),
('Customer Service Supervisor', 35000, 1),
('Customer Service Manager', 50000, 1),
('Junior Software Engineer', 50000, 2),
('Senior Software Engineer', 90000, 2),
('Network Architect', 90000, 2),
('Data Scientist', 65000, 2),
('Database Administrator', 65000, 2),
('Project Manager', 120000, 2),
('HR Recruiter', 40000, 3),
('HR Talent Specialist', 65000, 3),
('HR Compliance Specialist', 40000, 3),
('HR Trainer', 50000, 3),
('HR Manager', 120000, 3),
('Marketing Specialist', 40000, 4),
('Marketing Analyst', 65000, 4),
('Marketing Consultant', 70000, 4),
('Marketing Manager', 80000, 4),
('Operations Specialist', 50000, 5),
('Operations Supervisor', 65000, 5),
('Operations Manager', 140000, 5),
('Jr. Accountant', 65000, 6),
('Sr. Accountant', 80000, 6),
('Budget Analyst', 75000, 6),
('Chief Finance Officer', 130000, 6),
('Sales Representative', 25000, 7),
('Sales Lead', 50000, 7),
('Sales Manager', 65000, 7),
('Information Systems Security', 65000, 2),
('Information Systems Security Manager', 90000, 2);

insert into manager (first_name, last_name, role_id)
values
('Pat', 'Schwartz', 30),
('Jennifer', 'Williams', 28),
('Paul', 'Mueller', 21),
('Andrew', 'Pagan', 18),
('Catherine', 'Solange', 14),
('Yansi', 'Lui', 9),
('Beatrice', 'Ross', 3);


insert into employee (first_name, last_name, role_id, manager_id)
values 
('Christopher', 'Smith', 7, 1),
('Sandy', 'Lee', 10, 5),
('Leonardo', 'Conway', 15, 4),
('Carson', 'White', 29, 1),
('Elle', 'Coleman', 27, 7),
('Zaire', 'Clay', 22, 3),
('Duncan', 'Phillips', 4, 6);

