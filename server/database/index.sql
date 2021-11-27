create database crm;

create extension if not exists "uuid-ossp";

create table courses(
    course_uid UUID not null primary key,
    course_name text not null,
    course_price bigint not null
);

create table teachers(
    teacher_uid UUID not null primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    phone_number bigint not null,
    teacher_course_uid UUID default null,
    foreign key(teacher_course_uid)
        references courses(course_uid)
            on delete cascade
);

create table groups(
    group_id UUID not null primary key,
    group_name text not null,
    group_teacher_id UUID default null,
    group_course_id UUID default null,
    foreign key(group_teacher_id)
        references teachers(teacher_uid)
            on delete cascade,
    foreign KEY(group_course_id) 
        references courses(course_uid)
            on delete cascade
);

create table users(
    users_uid UUID not null primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    paid_price bigint default 0,
    phone_number bigint not null,
    users_group_id UUID default null,
    foreign key(users_group_id)
        references groups(group_id)
            on delete cascade
);

insert into course(course_uid, course_name, course_price)
values (uuid_generate_v4(), 'web dasturlash', 700000);

insert into groups(group_id, group_name, group_course_id)
values (uuid_generate_v4(), 'dasturlash-1', 'ad98468f-c0c1-4aff-b2a8-506326b204e1');

insert into users(users_uid, first_name, last_name, paid_price, phone_number, group_id, course_uid)
values (uuid_generate_v4(), 'mahdiy', 'sulaymonov', 700000, 998997698293, '981cbd49-59ce-4194-a6ab-05f2d2d5f33e', 'ad98468f-c0c1-4aff-b2a8-506326b204e1');

ALTER TABLE users DROP COLUMN;

SELECT *
FROM users
inner JOIN course
ON users.course_uid = course.course_uid
inner JOIN groups
ON users.course_uid = groups.group_course_id;
