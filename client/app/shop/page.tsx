import ProductCard from '@/components/ProductCard';

const dummyProducts = [
  { id: '1', title: 'Golden Fracture', price: 1200, category: 'Sculpture', image: 'https://placehold.co/600x800/101010/D4AF37?text=Art+1' },
  { id: '2', title: 'Obsidian Flow', price: 850, category: 'Wall Art', image: 'https://placehold.co/600x800/101010/D4AF37?text=Art+2' },
  { id: '3', title: 'Timber Echo', price: 2100, category: 'Furniture', image: 'https://placehold.co/600x800/101010/D4AF37?text=Art+3' },
  { id: '4', title: 'Charcoal Dreams', price: 450, category: 'Print', image: 'https://placehold.co/600x800/101010/D4AF37?text=Art+4' },
];

export default function Shop() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        <header className="mb-16 text-center">
          <h1 className="font-serif text-5xl font-bold mb-4 text-white">The Collection</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A curated selection of available works. Each piece is unique and handcrafted.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
