import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export const getUserByEmail = async (email, password) => {
    const query = 'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?';
    const result = await client.execute({
        sql: query,
        args: [email, password],
    });
    return result.rows.length > 0 ? result.rows[0] : undefined;
};

getUserByEmail("213Z0225@alum.huatusco.tecnm.mx", "12345")
    .then(console.log)
    .catch(console.error);
