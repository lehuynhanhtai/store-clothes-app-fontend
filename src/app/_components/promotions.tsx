import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Promotions = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Summer Sale"
              className="h-full w-full object-cover"
              width={1000}
              height="500"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center bg-black/30 p-8">
              <h3 className="mb-2 text-3xl font-bold text-white">Summer Sale</h3>
              <p className="mb-4 text-white">Up to 50% off select styles</p>
              <Button className="bg-white text-black hover:bg-white/90" asChild>
                <Link href="/products/sale">Shop Now</Link>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="New Collection"
              className="h-full w-full object-cover"
              width={1000}
              height="500"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center bg-black/30 p-8">
              <h3 className="mb-2 text-3xl font-bold text-white">New Collection</h3>
              <p className="mb-4 text-white">Discover our latest arrivals</p>
              <Button className="bg-white text-black hover:bg-white/90" asChild>
                <Link href="/products/new-arrivals">Explore</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
