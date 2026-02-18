'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { Loader2 } from 'lucide-react';

export default function EditProduct() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-white">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!product) return <div className="text-white">Product not found.</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-white mb-8">Edit Product</h1>
      <ProductForm initialData={product} />
    </div>
  );
}
