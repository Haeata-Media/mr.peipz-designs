'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        <header className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold mb-4 text-white"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Interested in a collaboration or have a question about a piece? We'd love to hear from you.
          </motion.p>
        </header>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800">
              <h3 className="text-2xl font-serif text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-primary">
                    <Mail size={20} />
                  </div>
                  <span>hello@mrpeipz.com</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-primary">
                    <Phone size={20} />
                  </div>
                  <span>+64 21 123 4567</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <span>Auckland, New Zealand</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-primary">
                    <Instagram size={20} />
                  </div>
                  <span>@mr.peipz</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form stub (real implementation would potentially use Resend/Server Actions) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-primary focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-primary focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-primary focus:outline-none"
                  placeholder="How can we help?"
                />
              </div>
              <button 
                type="button"
                className="w-full bg-primary text-black font-bold uppercase tracking-widest py-3 rounded hover:bg-white transition-colors"
                onClick={() => alert('Message Sent! (Demo)')}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
