import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

// Create a singleton pool for the app
let pool: Pool;

if (!connectionString) {
  console.warn('DATABASE_URL is not set. API routes will return empty data.');
  // Create a dummy pool to avoid crashes in environments without DB
  // @ts-expect-error - We purposely allow undefined here; callers should guard.
  pool = undefined;
} else {
  pool = new Pool({ connectionString });
}

export type DbProduct = {
  id: number;
  name: string;
  slug: string;
  price_cents: number;
  currency: string;
  image_url: string | null;
  description: string | null;
  category: string | null;
  stock: number;
  created_at: string;
};

export async function getAllActiveProducts(): Promise<DbProduct[]> {
  if (!pool) return [];
  const { rows } = await pool.query(
    `SELECT id, name, slug, price_cents, currency, image_url, description, category, stock, created_at
     FROM app_4.products
     WHERE is_active = TRUE
     ORDER BY created_at DESC
     LIMIT 100`
  );
  return rows as DbProduct[];
}

export async function getProductBySlug(slug: string): Promise<DbProduct | null> {
  if (!pool) return null;
  const { rows } = await pool.query(
    `SELECT id, name, slug, price_cents, currency, image_url, description, category, stock, created_at
     FROM app_4.products
     WHERE slug = $1 AND is_active = TRUE
     LIMIT 1`,
    [slug]
  );
  return (rows[0] as DbProduct) ?? null;
}
