import jwt from "jsonwebtoken";

// 1. Eliminamos la declaración constante en la raíz.
// 2. Creamos una función auxiliar que se llama solo cuando es necesario.
function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;

    // Si no existe el secreto cuando se intenta usar, lanzamos el error
    if (!secret) {
        throw new Error("FATAL: JWT_SECRET is not defined in environment variables.");
    }

    return secret;
}

export function createToken(payload: {
    userId: number
    email: string
}) {
    // El secreto se obtiene DENTRO de la función (en tiempo de ejecución)
    return jwt.sign(payload, getJwtSecret(), {
        expiresIn: "7d",
    })
}

export function verifyToken(token: string) {
    // El secreto se obtiene DENTRO de la función (en tiempo de ejecución)
    return jwt.verify(token, getJwtSecret())
}