import { NextResponse } from 'next/server';
import { getAllActiveProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await getAllActiveProducts();
    return NextResponse.json(products);
  } catch (err) {
    console.error('GET /api/products error', err);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}
