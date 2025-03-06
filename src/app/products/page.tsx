import ProductFilters from '@/app/products/_components/product-filtesr';
import ProductList from '@/app/products/_components/product-list';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">All Products</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <Suspense fallback={<ProductsLoadingSkeleton />}>
            <ProductFilters />
          </Suspense>
        </div>

        <div className="md:col-span-3">
          <Suspense fallback={<ProductsLoadingSkeleton />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[3/4] w-full rounded-md" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}
