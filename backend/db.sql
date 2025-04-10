CREATE database ventas_jorge;


create table clientes(
	id serial primary key,
	nombre varchar(150) not null,
	direccion varchar(150) not null,
	telefono varchar(50) not null,
	nit varchar(50) not null,
	dpi varchar(50) not null
)

create table productos(
	id serial primary key,
	nombre varchar(200) not null,
	codigo varchar(100) not null,
	descripcion varchar(250) not null,
	costo numeric(10,2) not null,
	existencia int not null default 0
)


create table pedidos(
	id serial primary key,
	id_cliente int not null references clientes(id),
	fecha timestamp default current_timestamp
)

create table detalle_pedidos(
	id serial primary key,
	producto_id int not null references productos(id),
	pedido_id int not null references pedidos(id),
	cantidad int not null default 0
)