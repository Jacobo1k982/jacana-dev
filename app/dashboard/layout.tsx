// app/dashboard/layout.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import DashboardNav from './DashboardNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if (!session?.user) redirect('/login')

    return (
        <div className="min-h-screen bg-[#06051d]">
            <DashboardNav user={session.user} />
            <main className="max-w-7xl mx-auto px-6 md:px-8 py-10">
                {children}
            </main>
        </div>
    )
}