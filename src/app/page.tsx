'use client';
import Categories from './_components/categories';
import FeaturedProducts from './_components/featured-products';
import Hero from './_components/hero';
import Newsletter from './_components/news-letter';
import Promotions from './_components/promotions';
import TrendingItems from './_components/trending-items';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Promotions />
      <TrendingItems />
      <Newsletter />
    </div>
  );
}
