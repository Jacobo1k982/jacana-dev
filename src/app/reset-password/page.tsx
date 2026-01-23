"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "../actions/auth";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("token", token || "");
        formData.append("email", email || "");

        const res = await resetPassword(formData);
        if (res.success) setMessage(res.message!);
        if (res.error) setError(res.error);
    }

    if (!token || !email) return <p>Enlace inválido</p>;

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white/5 backdrop-blur rounded-xl">
            <h1 className="text-2xl mb-6">Nueva contraseña</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="password"
                    type="password"
                    placeholder="Nueva contraseña"
                    required
                    minLength={8}
                    className="w-full p-3 mb-4 bg-white/10 rounded border border-white/20"
                />
                <button type="submit" className="w-full p-3 bg-indigo-600 rounded hover:bg-indigo-700">
                    Cambiar contraseña
                </button>
            </form>
            {message && <p className="mt-4 text-green-400">{message}. Redirigiendo al login...</p>}
            {error && <p className="mt-4 text-red-400">{error}</p>}
        </div>
    );
}