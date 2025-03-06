import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden z-0">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Hero background"
          className="h-full w-full object-cover"
          layout="fill"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="container relative z-10 mx-auto flex h-full items-center px-4">
        <div className="max-w-xl text-white">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">Summer Collection 2025</h1>
          <p className="mb-8 text-lg">
            Discover our latest collection of minimalist essentials designed for the modern wardrobe. Timeless pieces
            that blend comfort with sophistication.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
              <Link href="/products/new-arrivals">Shop New Arrivals</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/products">Explore Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
