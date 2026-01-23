"use client";

import { useState } from "react";
import { requestPasswordReset } from "../actions/auth";

export default function ForgotPassword() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await requestPasswordReset(formData);
        if (res.success) setMessage(res.message!);
        if (res.error) setError(res.error);
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white/5 backdrop-blur rounded-xl">
            <h1 className="text-2xl mb-6">Recuperar contraseña</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Tu email"
                    required
                    className="w-full p-3 mb-4 bg-white/10 rounded border border-white/20"
                />
                <button type="submit" className="w-full p-3 bg-indigo-600 rounded hover:bg-indigo-700">
                    Enviar enlace
                </button>
            </form>
            {message && <p className="mt-4 text-green-400">{message}</p>}
            {error && <p className="mt-4 text-red-400">{error}</p>}
        </div>
    );
}