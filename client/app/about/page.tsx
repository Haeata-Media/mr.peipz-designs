export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <header className="mb-16">
          <h1 className="font-serif text-5xl font-bold mb-4 text-white">The Artist</h1>
        </header>
        
        <div className="aspect-video bg-gray-800 mb-12 overflow-hidden relative">
             <div className="absolute inset-0 flex items-center justify-center text-gray-500">
               {/* Placeholder for artist portrait */}
               [Artist Portrait / Studio Shot]
             </div>
        </div>

        <div className="prose prose-invert mx-auto">
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Mr. Peipz is a visionary creator merging traditional craftsmanship with modern aesthetics.
            With a background in [Background], he explores the intersection of nature and industrial design.
          </p>
          <p className="text-gray-400">
            "My work is about capturing the raw essence of materials and elevating them into objects of contemplation."
          </p>
        </div>
      </div>
    </div>
  );
}
