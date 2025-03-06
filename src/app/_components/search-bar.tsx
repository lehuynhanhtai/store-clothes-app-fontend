'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [trendingSearches] = useState(['Summer Collection', 'Linen Shirts', 'Denim', 'Dresses', 'Accessories']);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = products.filter(
      product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchResults(filteredResults.slice(0, 5));
  }, [searchTerm]);

  return (
    <div className="relative z-50 pb-5 bg-white pt-5 container mx-auto">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            className="pl-10 pr-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button variant="ghost" size="icon" className="ml-2 cursor-pointer" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {searchTerm.trim() !== '' && searchResults.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-md border bg-white p-4 shadow-lg">
          <h3 className="mb-2 text-sm font-medium">Products</h3>
          <ul className="space-y-2">
            {searchResults.map(product => (
              <li key={product.id}>
                <Link
                  href={`/products/${product.id}`}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <div className="h-12 w-12 overflow-hidden rounded-md">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={200}
                      height="500"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchTerm.trim() === '' && (
        <div className="absolute left-0 right-0 top-full z-10 border bg-white p-4 shadow-lg rounded-b-md">
          <h3 className="mb-2 text-sm font-medium">Trending Searches</h3>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map(term => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => setSearchTerm(term)}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
