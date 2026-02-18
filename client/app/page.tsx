import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CountdownTimer from '@/components/CountdownTimer';
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <main className="flex-grow">
        <Hero />
        {/* Drop Banner */}
      <section className="py-20 bg-zinc-900 text-center">
        <div className="container mx-auto px-4">
          <p className="text-primary font-bold uppercase tracking-widest mb-4">Next Drop</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8">The Obsidian Collection</h2>
          
          <div className="flex justify-center mb-10">
             <CountdownTimer targetDate="2026-03-01T12:00:00Z" />
          </div>

          <Link 
            href="/shop" 
            className="inline-block border border-primary text-primary hover:bg-primary hover:text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-colors duration-300"
          >
            View Collection
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
