'use client';

import ProductForm from '@/components/admin/ProductForm';

export default function NewProduct() {
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-white mb-8">Add New Product</h1>
      <ProductForm />
    </div>
  );
}
