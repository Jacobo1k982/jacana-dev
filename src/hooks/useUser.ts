"use client"

import { useEffect, useState } from "react"

type User = {
    id: number
    name: string
    email: string
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
