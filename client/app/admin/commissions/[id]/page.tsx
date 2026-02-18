'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ArrowLeft, Mail, Phone, Calendar, DollarSign, CheckCircle } from 'lucide-react';

interface Commission {
  id: number;
  clientName: string;
  email: string;
  phone: string;
  type: string;
  budgetRange: string;
  deadline: string;
  description: string;
  status: string;
  depositPaid: boolean;
  finalPaid: boolean;
  createdAt: string;
}

export default function CommissionDetails() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { user } = useAuth();
  const [commission, setCommission] = useState<Commission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/commissions/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const data = await res.json();
        setCommission(data);
      } catch (error) {
        console.error('Error fetching commission:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id && user) {
      fetchCommission();
    }
  }, [id, user]);

  const updateStatus = async (newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/commissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ 
          status: newStatus,
          depositPaid: commission?.depositPaid,
          finalPaid: commission?.finalPaid 
        }),
      });

      if (res.ok) {
        setCommission(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const togglePayment = async (type: 'deposit' | 'final') => {
    if (!commission) return;
    
    const updates = {
      status: commission.status,
      depositPaid: type === 'deposit' ? !commission.depositPaid : commission.depositPaid,
      finalPaid: type === 'final' ? !commission.finalPaid : commission.finalPaid,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/commissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        setCommission(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  if (loading) return <div className="text-white flex justify-center py-20"><Loader2 className="animate-spin" /></div>;
  if (!commission) return <div className="text-white">Commission not found.</div>;

  return (
    <div>
      <div className="mb-8">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Commissions
        </button>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">{commission.clientName}</h1>
          <div className="flex items-center space-x-4 text-sm text-zinc-400">
            <span className="flex items-center"><Mail size={14} className="mr-1" /> {commission.email}</span>
            {commission.phone && <span className="flex items-center"><Phone size={14} className="mr-1" /> {commission.phone}</span>}
            <span className="flex items-center"><Calendar size={14} className="mr-1" /> {new Date(commission.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {['pending', 'approved', 'in_progress', 'completed', 'declined'].map((status) => (
            <button
              key={status}
              onClick={() => updateStatus(status)}
              className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border transition-colors ${
                commission.status === status
                  ? 'bg-primary text-black border-primary'
                  : 'bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-500'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-4">Project Description</h3>
            <p className="text-gray-300 whitespace-pre-wrap">{commission.description}</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-4">Specs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Budget Range</p>
                <p className="text-white font-medium">{commission.budgetRange}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Deadline</p>
                <p className="text-white font-medium">{commission.deadline || 'Flexible'}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Type</p>
                <p className="text-white font-medium">{commission.type || 'Standard Bespoke'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-4">Payments</h3>
            
            <div className="space-y-4">
              <div 
                onClick={() => togglePayment('deposit')}
                className={`flex items-center justify-between p-4 rounded border cursor-pointer transition-all ${
                  commission.depositPaid 
                    ? 'bg-green-900/20 border-green-500/50' 
                    : 'bg-black border-zinc-700 hover:border-zinc-500'
                }`}
              >
                <div className="flex items-center">
                  <DollarSign size={20} className={commission.depositPaid ? 'text-green-400' : 'text-zinc-500'} />
                  <span className={`ml-3 font-medium ${commission.depositPaid ? 'text-green-400' : 'text-gray-400'}`}>Deposit</span>
                </div>
                {commission.depositPaid && <CheckCircle size={18} className="text-green-400" />}
              </div>

              <div 
                onClick={() => togglePayment('final')}
                className={`flex items-center justify-between p-4 rounded border cursor-pointer transition-all ${
                  commission.finalPaid 
                    ? 'bg-green-900/20 border-green-500/50' 
                    : 'bg-black border-zinc-700 hover:border-zinc-500'
                }`}
              >
                <div className="flex items-center">
                  <DollarSign size={20} className={commission.finalPaid ? 'text-green-400' : 'text-zinc-500'} />
                  <span className={`ml-3 font-medium ${commission.finalPaid ? 'text-green-400' : 'text-gray-400'}`}>Final Payment</span>
                </div>
                {commission.finalPaid && <CheckCircle size={18} className="text-green-400" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
