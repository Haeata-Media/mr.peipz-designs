'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ArrowLeft, Package, Truck, Calendar, MapPin, Mail } from 'lucide-react';

interface Order {
  id: number;
  user: { name: string; email: string };
  orderItems: { id: number; productId: number; quantity: number; product: { title: string; image: string; price: number } }[];
  totalAmount: number;
  paymentStatus: string;
  isDelivered: boolean;
  deliveredAt?: string;
  shippingAddress: string; // Assuming JSON string or object
  createdAt: string;
}

export default function OrderDetails() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id && user) {
      fetchOrder();
    }
  }, [id, user]);

  const markAsDelivered = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/deliver`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (res.ok) {
        setOrder(prev => prev ? { ...prev, isDelivered: true, deliveredAt: new Date().toISOString() } : null);
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (loading) return <div className="text-white flex justify-center py-20"><Loader2 className="animate-spin" /></div>;
  if (!order) return <div className="text-white">Order not found.</div>;

  return (
    <div>
      <div className="mb-8">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Orders
        </button>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Order #{order.id}</h1>
          <div className="flex items-center space-x-4 text-sm text-zinc-400">
             <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>
        
        {order.isDelivered ? (
           <div className="bg-green-900/20 text-green-400 px-4 py-2 rounded font-bold uppercase tracking-wider border border-green-500/50 flex items-center">
             <Truck size={18} className="mr-2" />
             Delivered
           </div>
        ) : (
           <button
             onClick={markAsDelivered}
             className="bg-primary text-black px-4 py-2 rounded font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center"
           >
             Mark as Delivered
           </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
             <table className="w-full text-left">
               <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
                 <tr>
                   <th className="px-6 py-4">Product</th>
                   <th className="px-6 py-4">Quantity</th>
                   <th className="px-6 py-4 text-right">Price</th>
                   <th className="px-6 py-4 text-right">Total</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-zinc-800 text-sm text-gray-300">
                 {order.orderItems.map((item) => (
                   <tr key={item.id}>
                     <td className="px-6 py-4 flex items-center">
                       {/* Optional image check */}
                       <span className="font-medium text-white">{item.product.title}</span>
                     </td>
                     <td className="px-6 py-4">{item.quantity}</td>
                     <td className="px-6 py-4 text-right">${item.product.price}</td>
                     <td className="px-6 py-4 text-right">${item.product.price * item.quantity}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-4">Customer</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <span className="font-medium">{order.user?.name || 'Guest'}</span>
              </div>
              <div className="flex items-center text-zinc-400 text-sm">
                <Mail size={16} className="mr-2" />
                {order.user?.email}
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-4">Shipping</h3>
             <div className="flex items-start text-zinc-400 text-sm">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <p>{order.shippingAddress || 'No address provided'}</p>
             </div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-4">Summary</h3>
            <div className="flex justify-between items-center text-xl font-bold text-primary">
              <span>Total</span>
              <span>${order.totalAmount}</span>
            </div>
             <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                <span className="text-zinc-400">Payment Status</span>
                <span className={`font-bold uppercase text-xs px-2 py-1 rounded ${order.paymentStatus === 'paid' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                    {order.paymentStatus}
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
