// GET /api/downloads — totales públicos { finflow: 123 }
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const rows = await prisma.appDownload.findMany({ select: { slug: true, count: true } })
        const counts = Object.fromEntries(rows.map((r) => [r.slug, r.count]))
        return NextResponse.json(counts, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } })
    } catch {
        return NextResponse.json({}, { status: 200 })
    }
}
