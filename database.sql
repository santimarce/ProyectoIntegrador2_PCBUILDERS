- Productos
CREATE TABLE public.producto
(
    id_producto serial NOT NULL,
    marca character varying(50) NOT NULL,
    modelo character varying(50) NOT NULL,
    precio money NOT NULL,
    stock integer NOT NULL,
    descripcion text,
    extras character varying(255) NOT NULL,
    foto bytea,
    fecharegistro timestamp with time zone NOT NULL,
    id_tipoproducto integer NOT NULL,
    PRIMARY KEY (id_producto)
);

ALTER TABLE IF EXISTS public.producto
    OWNER to postgres;

COMMENT ON TABLE public.producto
    IS 'Tabla de productos disponibles en stock con sus características principales';

COMMENT ON COLUMN public.producto.id_producto
    IS 'Código del producto asignado en la base';

COMMENT ON COLUMN public.producto.marca
    IS 'Marca del producto ingresado, solo se ingresan siglas de la marca si el nombre es largo (Advanced Micro Devices como AMD)';

COMMENT ON COLUMN public.producto.modelo
    IS 'El modelo de la tabla, debe ser el mostrado en la caja nombres cortos de preferencia sin referencias al pais de destino puesto por el fabricante.';

COMMENT ON COLUMN public.producto.precio
    IS 'Precio de venta SIN IVA';

COMMENT ON COLUMN public.producto.descripcion
    IS 'Guarda la descripción del producto que se ha ingresado, limitarse a escribir características técnicas con un orden predeterminado.';

COMMENT ON COLUMN public.producto.extras
    IS 'En este campo se ponen las características únicas de cada próducto que se usarán en el front para el apartado de armarpc, donde se debe tomar en cuenta temas únicos de cada tipo de componente. Ser extremadamente específicos dependiendo el tipo de producto unicamente especificar esos campos y la potencia que requiere.';

COMMENT ON COLUMN public.producto.id_tipoproducto
    IS 'Id del tipo de producto que se ingresa';

- Tipo productos
-- Table: public.tipoproducto

-- DROP TABLE IF EXISTS public.tipoproducto;

CREATE TABLE IF NOT EXISTS public.tipoproducto
(
    id_tipoproducto integer NOT NULL,
    nombre_tipoproducto character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tipoproducto_pkey PRIMARY KEY (id_tipoproducto)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tipoproducto
    OWNER to postgres;

COMMENT ON TABLE public.tipoproducto
    IS 'Tabla de tipos de productos';

COMMENT ON COLUMN public.tipoproducto.id_tipoproducto
    IS 'Id del tipo de producto';

COMMENT ON COLUMN public.tipoproducto.nombre_tipoproducto
    IS 'Tipo de producto que se puede ingresar a la base';
alter table producto
add constraint fk_tipoproducto foreign key (id_producto)
references tipoproducto(id_tipoproducto);

- Usuarios

-- Table: public.producto

-- DROP TABLE IF EXISTS public.producto;

CREATE TABLE IF NOT EXISTS public.producto
(
    id_producto integer NOT NULL DEFAULT nextval('producto_id_producto_seq'::regclass),
    marca character varying(50) COLLATE pg_catalog."default" NOT NULL,
    modelo character varying(50) COLLATE pg_catalog."default" NOT NULL,
    precio money NOT NULL,
    stock integer NOT NULL,
    descripcion text COLLATE pg_catalog."default",
    extras character varying(255) COLLATE pg_catalog."default" NOT NULL,
    foto bytea,
    fecharegistro timestamp with time zone NOT NULL,
    id_tipoproducto integer NOT NULL,
    CONSTRAINT producto_pkey PRIMARY KEY (id_producto),
    CONSTRAINT fk_tipoproducto FOREIGN KEY (id_producto)
        REFERENCES public.tipoproducto (id_tipoproducto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.producto
    OWNER to postgres;

COMMENT ON TABLE public.producto
    IS 'Tabla de productos disponibles en stock con sus características principales';

COMMENT ON COLUMN public.producto.id_producto
    IS 'Código del producto asignado en la base';

COMMENT ON COLUMN public.producto.marca
    IS 'Marca del producto ingresado, solo se ingresan siglas de la marca si el nombre es largo (Advanced Micro Devices como AMD)';

COMMENT ON COLUMN public.producto.modelo
    IS 'El modelo de la tabla, debe ser el mostrado en la caja nombres cortos de preferencia sin referencias al pais de destino puesto por el fabricante.';

COMMENT ON COLUMN public.producto.precio
    IS 'Precio de venta SIN IVA';

COMMENT ON COLUMN public.producto.descripcion
    IS 'Guarda la descripción del producto que se ha ingresado, limitarse a escribir características técnicas con un orden predeterminado.';

COMMENT ON COLUMN public.producto.extras
    IS 'En este campo se ponen las características únicas de cada próducto que se usarán en el front para el apartado de armarpc, donde se debe tomar en cuenta temas únicos de cada tipo de componente. Ser extremadamente específicos dependiendo el tipo de producto unicamente especificar esos campos y la potencia que requiere.';

COMMENT ON COLUMN public.producto.id_tipoproducto
    IS 'Id del tipo de producto que se ingresa';


-administradores

-- Table: public.administradores

-- DROP TABLE IF EXISTS public.administradores;

CREATE TABLE IF NOT EXISTS public.administradores
(
    -- Inherited from table public.usuarios: emailusuario character varying(255) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: nombresusuario character varying(100) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: apellidousuario character varying(100) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: contrasenia character varying(255) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: calleprincipal character varying(50) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: callesecundaria character varying(50) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: nrocasa character varying(25) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: fecharegistro timestamp with time zone NOT NULL,
    -- Inherited from table public.usuarios: fechanacimiento date NOT NULL,
    -- Inherited from table public.usuarios: fotografia bytea,
    id_administrador smallint NOT NULL,
    fechaasignacion time with time zone NOT NULL,
    estadoactividad boolean NOT NULL,
    CONSTRAINT administradores_pkey PRIMARY KEY (id_administrador)
)
    INHERITS (public.usuarios)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.administradores
    OWNER to postgres;

COMMENT ON TABLE public.administradores
    IS 'Tabla de identificacion de admins';

COMMENT ON COLUMN public.administradores.id_administrador
    IS 'Id del administrador seleccionado';

COMMENT ON COLUMN public.administradores.fechaasignacion
    IS 'fecha en la que se le asigno como administrador';

COMMENT ON COLUMN public.administradores.estadoactividad
    IS 'Indicador para saber si el administrador se encuetra activo o no en el sistema';

- Pedidos

-- Table: public.pedido

-- DROP TABLE IF EXISTS public.pedido;

CREATE TABLE IF NOT EXISTS public.pedido
(
    id_pedido serial NOT NULL,
    fechapedido timestamp with time zone NOT NULL,
    fechaentrega date NOT NULL,
    lugarentrega character varying(200) COLLATE pg_catalog."default" NOT NULL,
    id_clientes integer NOT NULL,
    totalpedido money NOT NULL,
    CONSTRAINT pedido_pkey PRIMARY KEY (id_pedido),
    CONSTRAINT fk_cliente FOREIGN KEY (id_clientes)
        REFERENCES public.clientes (id_clientes) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pedido
    OWNER to postgres;

COMMENT ON TABLE public.pedido
    IS 'Tabla de pedidos realizados';

COMMENT ON COLUMN public.pedido.id_pedido
    IS 'Identificador del pedido';

COMMENT ON COLUMN public.pedido.fechapedido
    IS 'Fecha en la cual se realizo el pedido por el usuario.';

COMMENT ON COLUMN public.pedido.fechaentrega
    IS 'Fecha calculada por el sistema aproximada de la entrega';

COMMENT ON COLUMN public.pedido.lugarentrega
    IS 'Indicaciones para la entrega del producto.';

COMMENT ON COLUMN public.pedido.id_clientes
    IS 'Referencia del cliente que realiza el pedido';

- registro productos

-- Table: public.registroproductos

-- DROP TABLE IF EXISTS public.registroproductos;

CREATE TABLE IF NOT EXISTS public.registroproductos
(
    id_registro integer NOT NULL DEFAULT nextval('registroproductos_id_registro_seq'::regclass),
    id_administrador smallint NOT NULL,
    id_producto integer NOT NULL,
    CONSTRAINT registroproductos_pkey PRIMARY KEY (id_registro),
    CONSTRAINT id_administrador FOREIGN KEY (id_administrador)
        REFERENCES public.administradores (id_administrador) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT id_producto FOREIGN KEY (id_producto)
        REFERENCES public.producto (id_producto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.registroproductos
    OWNER to postgres;

COMMENT ON TABLE public.registroproductos
    IS 'Tabla de registro de productos ';

COMMENT ON COLUMN public.registroproductos.id_registro
    IS 'Id para los registros.';

COMMENT ON COLUMN public.registroproductos.id_administrador
    IS 'Id del administrador que realizo el ingreso del producto ';

COMMENT ON COLUMN public.registroproductos.id_producto
    IS 'Id del producto ingresado al sistema';

- registropedidos-producto

-- Table: public.registropedidoproducto

-- DROP TABLE IF EXISTS public.registropedidoproducto;

CREATE TABLE IF NOT EXISTS public.registropedidoproducto
(
    id_registropedidoprod bigint NOT NULL DEFAULT nextval('registropedidoproducto_id_registropedidoprod_seq'::regclass),
    id_pedido integer NOT NULL,
    id_producto integer NOT NULL,
    cantidadproductos smallint NOT NULL,
    descripcionoproducto text COLLATE pg_catalog."default",
    CONSTRAINT registropedidoproducto_pkey PRIMARY KEY (id_registropedidoprod),
    CONSTRAINT fk_pedido FOREIGN KEY (id_pedido)
        REFERENCES public.pedido (id_pedido) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_producto FOREIGN KEY (id_producto)
        REFERENCES public.producto (id_producto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.registropedidoproducto
    OWNER to postgres;

COMMENT ON TABLE public.registropedidoproducto
    IS 'Tabla registro de pedidos y productos';

COMMENT ON COLUMN public.registropedidoproducto.id_registropedidoprod
    IS 'Identificador del numero registros pedido-productos';

COMMENT ON COLUMN public.registropedidoproducto.id_pedido
    IS 'Identificador del pedido';

COMMENT ON COLUMN public.registropedidoproducto.id_producto
    IS 'identificador del producto';

COMMENT ON COLUMN public.registropedidoproducto.cantidadproductos
    IS 'Cantidad de poductos seleccionados en el pedido';

COMMENT ON COLUMN public.registropedidoproducto.descripcionoproducto
    IS 'Descripcion opcional del producto';

COMMENT ON CONSTRAINT fk_pedido ON public.registropedidoproducto
    IS 'referencia de pedidos';
COMMENT ON CONSTRAINT fk_producto ON public.registropedidoproducto
    IS 'referencia del producto';

- tipo de pago

-- Table: public.tipopago

-- DROP TABLE IF EXISTS public.tipopago;

CREATE TABLE IF NOT EXISTS public.tipopago
(
    id_formapago smallint NOT NULL DEFAULT nextval('tipopago_id_formapago_seq'::regclass),
    descripcion_formapago "char" NOT NULL,
    CONSTRAINT tipopago_pkey PRIMARY KEY (id_formapago)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tipopago
    OWNER to postgres;

COMMENT ON TABLE public.tipopago
    IS 'formas de pago del usuario';

COMMENT ON COLUMN public.tipopago.id_formapago
    IS 'id del tipo de forma de pago';

COMMENT ON COLUMN public.tipopago.descripcion_formapago
    IS 'Las formas de pago que se pueden usar en el sistema (T - Transferencia, E - Pago en efectivo)';

- Cliente

-- Table: public.clientes

-- DROP TABLE IF EXISTS public.clientes;

CREATE TABLE IF NOT EXISTS public.clientes
(
    -- Inherited from table public.usuarios: emailusuario character varying(255) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: nombresusuario character varying(100) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: apellidousuario character varying(100) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: contrasenia character varying(255) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: calleprincipal character varying(50) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: callesecundaria character varying(50) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: nrocasa character varying(25) COLLATE pg_catalog."default" NOT NULL,
    -- Inherited from table public.usuarios: fecharegistro timestamp with time zone NOT NULL,
    -- Inherited from table public.usuarios: fechanacimiento date NOT NULL,
    -- Inherited from table public.usuarios: fotografia bytea,
    id_clientes integer NOT NULL DEFAULT nextval('clientes_id_clientes_seq'::regclass),
    tipocliente "char" NOT NULL,
    id_formapago smallint NOT NULL,
    CONSTRAINT clientes_pkey PRIMARY KEY (id_clientes),
    CONSTRAINT fk_formapago FOREIGN KEY (id_formapago)
        REFERENCES public.tipopago (id_formapago) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
    INHERITS (public.usuarios)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.clientes
    OWNER to postgres;

COMMENT ON TABLE public.clientes
    IS 'Tabla de clientes';

COMMENT ON COLUMN public.clientes.id_clientes
    IS 'Identificador de los clientes';

COMMENT ON COLUMN public.clientes.tipocliente
    IS 'Define el tipo del cliente que es para aplicacion de promociones u otros.';

- Para el diccionario de los datos:

SELECT
    t1.TABLE_NAME AS tabla_nombre,
    t1.COLUMN_NAME AS columna_nombre,
    t1.IS_NULLABLE AS columna_nulo,
    t1.DATA_TYPE AS columna_tipo_dato,
    COALESCE(t1.NUMERIC_PRECISION,
    t1.CHARACTER_MAXIMUM_LENGTH) AS columna_longitud,
    PG_CATALOG.COL_DESCRIPTION(t2.OID,
    t1.DTD_IDENTIFIER::int) AS columna_descripcion
FROM 
    INFORMATION_SCHEMA.COLUMNS t1
    INNER JOIN PG_CLASS t2 ON (t2.RELNAME = t1.TABLE_NAME)
WHERE 
    t1.TABLE_SCHEMA = 'public'
ORDER BY
    t1.TABLE_NAME;
