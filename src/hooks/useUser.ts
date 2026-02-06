"use client"

import { useEffect, useState } from "react"

export interface User {
    id: string
    name: string | null
    email: string | null
    image?: string | null
}

export function useUser() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                setUser(data?.user ?? null)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return { user, loading }
}
