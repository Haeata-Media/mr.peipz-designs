'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function Success() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center pt-24 pb-20">
      <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-green-400" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">
          Thank you for your purchase. Your order has been confirmed and we will be in touch shortly with shipping details.
        </p>
        <div className="space-y-4">
          <Link 
            href="/shop" 
            className="block w-full py-3 bg-primary text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/" 
            className="block w-full py-3 bg-black border border-zinc-700 text-white font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
