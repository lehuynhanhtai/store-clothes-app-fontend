'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import Image from 'next/image';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

const RelatedProducts = ({ currentProductId, category }: RelatedProductsProps) => {
  const relatedProducts = products
    .filter(product => product.id !== currentProductId && product.category === category)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {relatedProducts.map(product => (
          <div key={product.id} className="group relative">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-gray-100">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  width={200}
                  height="150"
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
                className="mt-4 w-full"
                // onClick={() =>
                //   addToCart({
                //     id: product.id,
                //     name: product.name,
                //     price: product.price,
                //     image: product.images[0],
                //     quantity: 1,
                //     color: product.colors[0],
                //     size: product.sizes[0],
                //   })
                // }
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
