'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ProductFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('newest');

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategories(category.split(','));
    }

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
    }

    const rating = searchParams.get('rating');
    if (rating) {
      setSelectedRating(rating);
    }

    const sort = searchParams.get('sort');
    if (sort) {
      setSortOption(sort);
    }
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','));
    }

    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());

    if (selectedRating) {
      params.set('rating', selectedRating);
    }

    params.set('sort', sortOption);

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSelectedRating(null);
    setSortOption('newest');
    router.push(pathname);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => (prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['categories', 'price', 'rating', 'sort']}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-men"
                  checked={selectedCategories.includes('men')}
                  onCheckedChange={() => handleCategoryChange('men')}
                />
                <Label htmlFor="category-men">Men</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-women"
                  checked={selectedCategories.includes('women')}
                  onCheckedChange={() => handleCategoryChange('women')}
                />
                <Label htmlFor="category-women">Women</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-accessories"
                  checked={selectedCategories.includes('accessories')}
                  onCheckedChange={() => handleCategoryChange('accessories')}
                />
                <Label htmlFor="category-accessories">Accessories</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={priceRange} min={0} max={200} step={5} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={selectedRating || ''} onValueChange={setSelectedRating}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="rating-4" />
                <Label htmlFor="rating-4">4 stars & above</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="rating-3" />
                <Label htmlFor="rating-3">3 stars & above</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="rating-2" />
                <Label htmlFor="rating-2">2 stars & above</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sort">
          <AccordionTrigger>Sort By</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={sortOption} onValueChange={setSortOption}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="newest" id="sort-newest" />
                <Label htmlFor="sort-newest">Newest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-asc" id="sort-price-asc" />
                <Label htmlFor="sort-price-asc">Price: Low to High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-desc" id="sort-price-desc" />
                <Label htmlFor="sort-price-desc">Price: High to Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rating" id="sort-rating" />
                <Label htmlFor="sort-rating">Highest Rated</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  );
};

export default ProductFilters;
