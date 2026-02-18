'use client';

import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function Cancel() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center pt-24 pb-20">
      <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <XCircle size={64} className="text-red-400" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-white mb-4">Payment Cancelled</h1>
        <p className="text-gray-400 mb-8">
          Your payment was not processed. No charges were made.
        </p>
        <Link 
          href="/shop" 
          className="block w-full py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-primary transition-colors rounded"
        >
          Return to Shop
        </Link>
      </div>
    </div>
  );
}
