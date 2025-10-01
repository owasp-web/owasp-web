import { NextRequest, NextResponse } from 'next/server'

// Placeholder endpoint: returns empty list for now
export async function GET(_req: NextRequest) {
  return NextResponse.json({ news: [] }, { headers: { 'Cache-Control': 's-maxage=30' } })
}


