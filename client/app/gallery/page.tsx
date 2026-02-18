import Image from 'next/image';

const galleryImages = [
  'https://placehold.co/600x800/101010/D4AF37?text=Gallery+1',
  'https://placehold.co/800x600/101010/D4AF37?text=Gallery+2',
  'https://placehold.co/600x900/101010/D4AF37?text=Gallery+3',
  'https://placehold.co/600x600/101010/D4AF37?text=Gallery+4',
  'https://placehold.co/800x1200/101010/D4AF37?text=Gallery+5',
  'https://placehold.co/600x400/101010/D4AF37?text=Gallery+6',
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        <header className="mb-16 text-center">
          <h1 className="font-serif text-5xl font-bold mb-4 text-white">Portfolio</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A visual journey through past projects and artistic explorations.
          </p>
        </header>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryImages.map((src, index) => (
            <div key={index} className="relative group overflow-hidden break-inside-avoid">
              <img
                src={src}
                alt={`Gallery items ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-primary font-bold tracking-widest uppercase">View Project</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
