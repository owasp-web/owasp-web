import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({ error: 'Not Implemented: configure upload target' }, { status: 501 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


