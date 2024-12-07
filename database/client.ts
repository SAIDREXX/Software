import { createClient } from "@libsql/client";

export const client = createClient({
    url: import.meta.env.TURSO_DATABASE_URL,
    authToken: import.meta.env.TURSO_AUTH_TOKEN,
});

interface User {
    name: string;
    f_lastname: string;
    s_lastname: string;
    enrollment: string;
    email: string;
    password: string;
}

interface User_Login {
    email: string;
    password: string;
}

interface Complaint_Files {
    identification_code: string;
    complaint_text: string;
    complaint_enrollment: string;
    status: number;

}
interface UpdateComplaint {
    codigo: string;
    estatus: number;
}

export const addUser = async (jsonData: User) => {
    const sql = "INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, matricula, email, contraseña) VALUES (?, ?, ?, ?, ?, ?)";

    const result = await client.execute({
        sql: sql,
        args: [jsonData.name, jsonData.f_lastname, jsonData.s_lastname, jsonData.enrollment, jsonData.email, jsonData.password],
    })

    console.log(result)
    return result
}

export const getUser = async (jsonData: User_Login) => {
    const sql = "SELECT * FROM usuarios WHERE email = ? AND contraseña = ?";
    const result = await client.execute({
        sql: sql,
        args: [jsonData.email, jsonData.password],
    });

    if (result.rows.length > 0) {
        return result.rows[0]; // Retorna el usuario si coincide
    } else {
        throw new Error("Credenciales incorrectas"); // Lanza un error si no hay coincidencia
    }
};

export const addComplaint = async (jsonData: Complaint_Files) => {
    const sql = "INSERT INTO denuncias (codigo_identificacion, texto_denuncia, matricula_denunciante, estado) VALUES (?, ?, ?, ?)";
    const result = await client.execute({
        sql: sql,
        args: [jsonData.identification_code, jsonData.complaint_text, jsonData.complaint_enrollment, jsonData.status],
    });

    return result;
}

export const updateComplaint = async (jsonData: UpdateComplaint) => {
    const sql = "UPDATE denuncias SET estado = ? WHERE codigo_identificacion = ?";
    const result = await client.execute({
        sql: sql,
        args: [jsonData.estatus, jsonData.codigo],
    });

    return result;
}