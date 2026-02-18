import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        {/* Featured Works Section Placeholder */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
             <div className="text-center mb-12">
               <h2 className="font-serif text-4xl mb-4">Latest Works</h2>
               <div className="w-20 h-1 bg-primary mx-auto" />
             </div>
             {/* Product Grid will go here */}
             <div className="text-center text-gray-500">Coming Soon</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
