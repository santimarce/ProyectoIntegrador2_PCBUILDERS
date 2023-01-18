create table Producto(
	Id_producto	integer	primary key not null,
	Marca	varchar(25) not null,
	Modelo	varchar(50) not null,
	Precio	float not null,
	stock	integer	not	null,
	Modulo	integer	not	null,
	fecha_adquisicion	date,
	categoria_idCat	integer);
