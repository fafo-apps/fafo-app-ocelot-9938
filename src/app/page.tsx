import Link from 'next/link';
import Image from 'next/image';

export type Product = {
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

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/api/products`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return (await res.json()) as Product[];
  } catch {
    return [];
  }
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Timeless Luxury, Effortlessly Yours
          </h1>
          <p className="mt-4 text-sm/6 text-[#d1d1d1]">
            Discover elevated essentials crafted with precision and care.
          </p>
        </header>

        {products.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl">
            <p className="text-base text-[#d1d1d1]">No products yet. Add items to your catalog to see them here.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <li key={p.id} className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition">
                <Link href={`/products/${p.slug}`} className="block">
                  <div className="aspect-[4/5] relative bg-black">
                    {p.image_url ? (
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        priority={false}
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-sm text-white/60">
                        Image coming soon
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{p.name}</h3>
                      <span className="text-[#c8a96a]">{formatPrice(p.price_cents, p.currency)}</span>
                    </div>
                    {p.category && (
                      <p className="mt-1 text-xs uppercase tracking-wider text-white/50">{p.category}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
