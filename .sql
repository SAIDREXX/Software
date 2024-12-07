-- Habilitar soporte para claves foráneas
PRAGMA foreign_keys = ON;

-- Crear la tabla usuarios
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido_paterno TEXT NOT NULL,
    apellido_materno TEXT NOT NULL,
    matricula TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    contraseña TEXT NOT NULL,
);

-- Crear la tabla denuncias
CREATE TABLE denuncias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_identificacion TEXT NOT NULL UNIQUE,
    texto_denuncia TEXT NOT NULL,
    matricula_denunciante TEXT NOT NULL,
    fecha_creacion TEXT DEFAULT (datetime('now')),
    estado INTEGER NOT NULL CHECK(estado IN (
        0, 
        1, 
        2, 
        3 
    )),
);