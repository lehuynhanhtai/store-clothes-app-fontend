'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const ProductList = () => {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    const category = searchParams.get('category');
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by price range
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice) {
      filtered = filtered.filter(product => product.price >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= Number(maxPrice));
    }

    // Filter by rating
    const rating = searchParams.get('rating');
    if (rating) {
      filtered = filtered.filter(product => product.rating >= Number(rating));
    }

    // Sort products
    const sort = searchParams.get('sort');
    if (sort) {
      switch (sort) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filtered = filtered.filter(product => product.isNew).concat(filtered.filter(product => !product.isNew));
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [searchParams]);

  if (filteredProducts.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
        <h3 className="mb-2 text-lg font-medium">No products found</h3>
        <p className="text-sm text-gray-500">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProducts.map(product => (
        <div key={product.id} className="group relative">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-gray-100">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.images[0]}
                alt={product.name}
                width={200}
                height={300}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
                      i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="ml-2 text-xs text-gray-500">({product.reviews})</p>
            </div>
            <Button className="mt-4 w-full">Add to Cart</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
