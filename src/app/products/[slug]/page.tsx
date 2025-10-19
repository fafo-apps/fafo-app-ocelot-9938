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

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/api/products/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as Product;
  } catch {
    return null;
  }
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white grid place-items-center p-8">
        <div className="text-center">
          <p className="text-lg">Product not found</p>
          <a href="/" className="mt-4 inline-block text-[#c8a96a] hover:underline">Back to shop</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-sm text-white/60">
              Image coming soon
            </div>
          )}
        </div>
        <div className="py-2">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{product.name}</h1>
          {product.category && (
            <p className="mt-2 text-xs uppercase tracking-wider text-white/50">{product.category}</p>
          )}
          <p className="mt-6 text-2xl text-[#c8a96a]">{formatPrice(product.price_cents, product.currency)}</p>
          <div className="mt-6 text-sm/7 text-[#d1d1d1] whitespace-pre-line">
            {product.description || 'Premium materials. Tailored fit. Made to last.'}
          </div>
          <div className="mt-8">
            <button disabled className="opacity-80 cursor-not-allowed rounded-full bg-white/10 border border-white/15 px-6 py-3 text-sm">
              Add to bag (coming soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
