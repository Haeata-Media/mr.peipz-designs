'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Order {
  id: number;
  user: { name: string; email: string };
  totalAmount: number;
  paymentStatus: string;
  isDelivered: boolean;
  createdAt: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white">Loading orders...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-white mb-8">Orders</h1>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Paid</th>
              <th className="px-6 py-4">Delivered</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-sm text-gray-300">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 font-mono text-zinc-500">#{order.id}</td>
                <td className="px-6 py-4 font-medium text-white">
                    {order.user?.name || 'Guest'}
                    <div className="text-xs text-zinc-500">{order.user?.email}</div>
                </td>
                <td className="px-6 py-4">${order.totalAmount}</td>
                <td className="px-6 py-4">
                    {order.paymentStatus === 'paid' ? (
                        <span className="text-green-400 font-bold text-xs uppercase bg-green-900/20 px-2 py-1 rounded">Paid</span>
                    ) : (
                        <span className="text-red-400 font-bold text-xs uppercase bg-red-900/20 px-2 py-1 rounded">Unpaid</span>
                    )}
                </td>
                <td className="px-6 py-4">
                     {order.isDelivered ? (
                        <span className="text-green-400 font-bold text-xs uppercase bg-green-900/20 px-2 py-1 rounded">Yes</span>
                    ) : (
                        <span className="text-yellow-400 font-bold text-xs uppercase bg-yellow-900/20 px-2 py-1 rounded">No</span>
                    )}
                </td>
                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/orders/${order.id}`} className="text-primary hover:text-white">
                    <Eye size={18} />
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-zinc-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
