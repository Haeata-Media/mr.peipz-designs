import CommissionForm from '@/components/CommissionForm';

export default function Commissions() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Info Section */}
          <div className="lg:w-1/2">
            <h1 className="font-serif text-5xl font-bold mb-6 text-white">Bespoke Commissions</h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Collaborate to create a piece that perfectly fits your narrative and space. 
              Our commission process is designed to be personal and transparent.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">01. Consultation</h3>
                <p className="text-gray-400">We discuss your vision, dimensions, and materials.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">02. Proposal & Deposit</h3>
                <p className="text-gray-400">You receive a sketch and quote. A 50% deposit secures your slot.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">03. Creation</h3>
                <p className="text-gray-400">Updates are shared as your piece comes to life.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">04. Delivery</h3>
                <p className="text-gray-400">Final payment and worldwide shipping.</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:w-1/2 bg-white/5 p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Start Your Project</h2>
            <CommissionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
