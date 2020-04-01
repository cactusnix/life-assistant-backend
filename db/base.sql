create table fund (
  id int not null auto_increment primary key comment '基金记录id',
  name varchar(25) not null comment '基金名称',
  code varchar(6) not null comment '基金代码',
  holding_days int(4) not null default 0 comment '基金持有天数',
  flag int(1) not null default 0 comment '基金交易状态标志位/0(买入中)/1(撤销中)/2(确认完成)/3(撤销成功)/4(卖出中)/5(到账成功)',
  is_finish int(1) not null default 0 comment '基金记录是否结束/0(进行)/1(完成)',
  purchase_service_charge double(5,4) not null default 0.00 comment '基金购入手续费率',
  sell_service_charge decimal(5,4) not null default 0.00 comment '基金卖出手续费率',
  purchase_service_price decimal(10,2) not null default 0.00 comment '基金购入手续费',
  sell_service_price decimal(10,2) not null default 0.00 comment '基金卖出手续费',
  amount decimal(10,2) not null default 0.00 comment '基金份额',
  purchase_price decimal(10,2) not null default 0.00 comment '基金购入价格',
  cost_price decimal(10,4) not null default 0.0000 comment '基金成本价',
  holding_income decimal(10,2) not null default 0 comment '基金持有收益',
  created_at timestamp not null default current_timestamp comment '创建时间(购买时间)',
  updated_at timestamp not null default current_timestamp on update current_timestamp comment '更新时间',
  deleted_at timestamp not null default current_timestamp comment '删除时间'
) comment '基金购买记录表'