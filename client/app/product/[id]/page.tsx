'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import CheckoutButton from '@/components/CheckoutButton';

export default function ProductPage() {
  const params = useParams();
  const { id } = params;

  // Dummy product data (would come from API/Context)
  const product = {
    id: id as string,
    title: 'Golden Fracture',
    price: 1200,
    category: 'Sculpture',
    description: 'A study in controlled chaos, where organic wood grain meets industrial gold leaf application. Each fracture is intentional, highlighting the beauty of imperfection.',
    dimensions: '40cm x 30cm x 15cm',
    materials: 'Reclaimed Oak, 24k Gold Leaf, Resin',
    image: 'https://placehold.co/600x800/101010/D4AF37?text=Art+Detail',
  };

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
            </div>

            <div className="mt-8">
              <CheckoutButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
