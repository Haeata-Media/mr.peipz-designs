'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const CommissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    // TODO: Connect to backend API
    alert('Request submitted! (Demo only)');
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit} 
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full bg-white/5 border border-white/10 rounded-none shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full bg-white/5 border border-white/10 rounded-none shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-300">Budget Range (NZD)</label>
        <select
          name="budget"
          id="budget"
          className="mt-1 block w-full bg-white/5 border border-white/10 rounded-none shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
          value={formData.budget}
          onChange={handleChange}
        >
          <option className="bg-black" value="">Select a range</option>
          <option className="bg-black" value="500-1000">$500 - $1,000</option>
          <option className="bg-black" value="1000-2500">$1,000 - $2,500</option>
          <option className="bg-black" value="2500+">$2,500+</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Project Description</label>
        <textarea
          name="description"
          id="description"
          rows={4}
          required
          className="mt-1 block w-full bg-white/5 border border-white/10 rounded-none shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-4 px-4 border border-transparent shadow-sm text-sm font-bold uppercase tracking-widest text-black bg-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300"
        >
          Submit Request
        </button>
      </div>
    </motion.form>
  );
};

export default CommissionForm;
