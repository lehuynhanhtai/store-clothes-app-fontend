import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 'men',
    name: 'Men',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80',
    href: '/products/men',
  },
  {
    id: 'women',
    name: 'Women',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80',
    href: '/products/women',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80',
    href: '/products/accessories',
  },
];

const Categories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">Shop by Category</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map(category => (
            <Link key={category.id} href={category.href} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={800}
                  height={1200}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity group-hover:bg-black/40">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
