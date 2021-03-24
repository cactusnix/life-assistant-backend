create database if not exists crawler_data;


create table if not exists lottery
(
    issue              varchar(5) primary key comment '期号（21001）',
    draw_date          varchar(10) not null comment '开奖日期（2021-01-01）',
    prize_num          varchar(20) not null comment '开奖号码',
    disorder_prize_num varchar(20) not null comment '开奖号码（无序）',
    sales              double      not null comment '销售额（元）',
    prize_pool         double      not null comment '奖金池金额（元）',
    created_at         timestamp   not null default current_timestamp comment '创建时间',
    updated_at         timestamp   not null default current_timestamp on update current_timestamp comment '更新时间',
    deleted_at         timestamp            default null comment '删除时间'
);

create table if not exists prize
(
    prize_id        int primary key auto_increment comment '主键ID',
    issue           varchar(5) comment '期号（21001）',
    prize_type      varchar(3) not null comment '奖金类型（eg: 一等奖）',
    note_number     int        not null comment '注数',
    prize           double     not null comment '奖金',
    add_note_number int        not null comment '追加注数',
    add_prize       double     not null comment '追加奖金',
    created_at      timestamp  not null default current_timestamp comment '创建时间(购买时间)',
    updated_at      timestamp  not null default current_timestamp on update current_timestamp comment '更新时间',
    deleted_at      timestamp           default null comment '删除时间'
);