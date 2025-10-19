import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await getProductBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    console.error('GET /api/products/[slug] error', err);
    return NextResponse.json({ error: 'Failed to load product' }, { status: 500 });
  }
}
