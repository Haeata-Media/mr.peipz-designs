'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Commission {
  id: number;
  clientName: string;
  type: string;
  status: string;
  createdAt: string;
}

export default function AdminCommissions() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommissions();
  }, []);

  const fetchCommissions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/commissions', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await res.json();
      setCommissions(data);
    } catch (error) {
      console.error('Error fetching commissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'approved': return 'text-blue-400';
      case 'in_progress': return 'text-purple-400';
      case 'completed': return 'text-green-400';
      case 'declined': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (loading) return <div className="text-white">Loading commissions...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-white mb-8">Commissions</h1>

      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-sm text-gray-300">
            {commissions.map((commission) => (
              <tr key={commission.id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{commission.clientName}</td>
                <td className="px-6 py-4">{commission.type || 'Bespoke'}</td>
                <td className={`px-6 py-4 font-bold uppercase text-xs ${getStatusColor(commission.status)}`}>
                  {commission.status.replace('_', ' ')}
                </td>
                <td className="px-6 py-4">{new Date(commission.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/commissions/${commission.id}`} className="text-primary hover:text-white">
                    <Eye size={18} />
                  </Link>
                </td>
              </tr>
            ))}
            {commissions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                  No commission requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
