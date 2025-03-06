'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import Image from 'next/image';
import { addProduct } from '@/store/product-store';

const FeaturedProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const { addToCart } = useCart();

  const featuredProducts = products.filter(product => product.isFeatured);
  const productsPerPage = 4;
  const totalPages = Math.ceil(featuredProducts.length / productsPerPage);

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === totalPages - 1 ? 0 : prevIndex + 1));
  };

  const visibleProducts = featuredProducts.slice(currentIndex * productsPerPage, (currentIndex + 1) * productsPerPage);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={handlePrevious} disabled={totalPages <= 1}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext} disabled={totalPages <= 1}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {visibleProducts.map(product => (
            <div key={product.id} className="group relative">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-gray-100">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    width={800}
                    height={1200}
                  />
                </Link>
                {product.isNew && (
                  <div className="absolute left-2 top-2 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                    New
                  </div>
                )}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-xs text-gray-500">({product.reviews})</p>
                </div>
                <Button
                  className="mt-4 w-full cursor-pointer"
                  onClick={() =>
                    addProduct({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      description: product.description,
                      category: product.category,
                      subcategory: product.subcategory,
                      sizes: product.sizes,
                      colors: product.colors,
                      images: product.images,
                      rating: product.rating,
                      reviews: product.reviews,
                      isNew: product.isNew,
                      isFeatured: product.isFeatured,
                      isTrending: product.isTrending,
                    })
                  }
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
