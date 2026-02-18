import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CheckoutButton from '@/components/CheckoutButton';
import CountdownTimer from '@/components/CountdownTimer';

// Would be a real fetch in production
async function getProduct(id: string) {
    // Simulate fetch delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
        id: id as string,
        title: 'Golden Fracture',
        price: 1200,
        category: 'Sculpture',
        description: 'A study in controlled chaos, where organic wood grain meets industrial gold leaf application. Each fracture is intentional, highlighting the beauty of imperfection.',
        dimensions: '40cm x 30cm x 15cm',
        materials: 'Reclaimed Oak, 24k Gold Leaf, Resin',
        image: 'https://placehold.co/600x800/101010/D4AF37?text=Art+Detail',
        isLimitedEdition: true,
        editionSize: 10,
        dropDate: '2026-03-01T12:00:00Z',
  };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  if (!product) {
      return { title: 'Product Not Found' };
  }

  return {
    title: `${product.title} | Mr. Peipz Designs`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
            <Link href="/shop" className="text-gray-400 hover:text-primary transition-colors">
                &larr; Back to Shop
            </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
          {/* Image */}
          <div className="aspect-[3/4] bg-gray-900 overflow-hidden">
             <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div>
            <span className="text-primary tracking-widest uppercase text-sm font-bold">{product.category}</span>
            <h1 className="font-serif text-5xl font-bold mt-2 mb-6">{product.title}</h1>
            <p className="text-3xl font-light mb-8">${product.price}</p>
            
            <div className="prose prose-invert mb-8">
              <p>{product.description}</p>
            </div>

            <div className="border-t border-white/10 py-6 space-y-3">
               <div className="flex justify-between">
                 <span className="text-gray-400">Dimensions</span>
                 <span>{product.dimensions}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-400">Materials</span>
                 <span>{product.materials}</span>
               </div>
               {product.editionSize && (
                 <div className="flex justify-between">
                   <span className="text-gray-400">Edition Size</span>
                   <span>{product.editionSize}</span>
                 </div>
               )}
            </div>

            <div className="mt-8">
              {product.dropDate && new Date(product.dropDate) > new Date() ? (
                <div className="text-center">
                  <p className="text-primary font-bold uppercase tracking-widest mb-2">Dropping In</p>
                  <CountdownTimer targetDate={product.dropDate} />
                  <button 
                    disabled 
                    className="w-full py-4 bg-zinc-800 text-zinc-500 font-bold uppercase tracking-widest cursor-not-allowed mt-4"
                  >
                    Coming Soon
                  </button>
                </div>
              ) : (
                <CheckoutButton product={product} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
