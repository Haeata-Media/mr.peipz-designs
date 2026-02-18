'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    category: initialData?.category || '',
    dimensions: initialData?.dimensions || '',
    materials: initialData?.materials || '',
    stock: initialData?.stock || '',
    isLimitedEdition: initialData?.isLimitedEdition || false,
    editionSize: initialData?.editionSize || '',
    dropDate: initialData?.dropDate ? new Date(initialData.dropDate).toISOString().slice(0, 16) : '',
    image: initialData?.image || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData(prev => ({ ...prev, image: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value as any);
      }
    });

    try {
      const url = initialData 
        ? `http://localhost:5000/api/products/${initialData.id}`
        : 'http://localhost:5000/api/products';
      
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: data,
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-zinc-900 p-8 rounded-lg border border-zinc-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
          <select
            name="category"
            required
            className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Sculpture">Sculpture</option>
            <option value="Wall Art">Wall Art</option>
            <option value="Furniture">Furniture</option>
            <option value="Print">Print</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
        <textarea
          name="description"
          required
          rows={4}
          className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            required
            className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            required
            className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Dimensions</label>
          <input
            type="text"
            name="dimensions"
            className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={formData.dimensions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Materials</label>
          <input
            type="text"
            name="materials"
            className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={formData.materials}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Product Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full bg-black border border-zinc-700 rounded p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black hover:file:bg-white"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Drop Date (Optional)</label>
        <input
          type="datetime-local"
          name="dropDate"
          value={formData.dropDate}
          onChange={handleChange}
          className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
        />
        <p className="text-xs text-zinc-500 mt-1">Leave blank if available immediately.</p>
      </div>

      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="isLimitedEdition"
            checked={formData.isLimitedEdition}
            onChange={handleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-400">Limited Edition?</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold uppercase tracking-widest text-black bg-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="animate-spin" /> : (initialData ? 'Update Product' : 'Create Product')}
      </button>
    </form>
  );
}
