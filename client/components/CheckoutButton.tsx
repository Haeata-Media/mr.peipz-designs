'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface CheckoutButtonProps {
  product: Product;
}

export default function CheckoutButton({ product }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              id: product.id,
              title: product.title,
              image: product.image,
              price: product.price,
              quantity: 1,
            },
          ],
          userId: user?.id,
          email: user?.email,
          shippingAddress: {}, 
        }),
      });

      const { id } = await res.json();
      
      const stripe = await stripePromise;
      if (!stripe) return;

      const { error } = await (stripe as any).redirectToCheckout({ sessionId: id });
      
      if (error) {
        console.error('Stripe redirect error:', error);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 flex justify-center items-center"
    >
      {loading ? <Loader2 className="animate-spin mr-2" /> : 'Purchase Now'}
    </button>
  );
}
