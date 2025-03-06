'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Minus, Plus, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/products';
import RelatedProducts from '../_components/related-products';
import Image from 'next/image';

export default function ProductPage() {
  const params = useParams();
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);

  const handleAddToCart = () => {
    // addToCart({
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   image: product.images[0],
    //   quantity,
    //   color: selectedColor,
    //   size: selectedSize,
    // });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-900">
          Home
        </Link>
        <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
        <Link href="/products" className="text-gray-500 hover:text-gray-900">
          Products
        </Link>
        <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
        <span className="font-medium text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={mainImage}
              alt={product.name}
              className="h-full w-full object-cover object-center"
              width={200}
              height="150"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`overflow-hidden rounded-md ${
                  mainImage === image ? 'ring-2 ring-black' : 'ring-1 ring-gray-200'
                }`}
                onClick={() => setMainImage(image)}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                  width={200}
                  height="150"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {product.rating.toFixed(1)} ({product.reviews} reviews)
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Color</h3>
            <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex space-x-3">
              {product.colors.map(color => (
                <div key={color} className="flex items-center space-x-2">
                  <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                  <Label
                    htmlFor={`color-${color}`}
                    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border ${
                      selectedColor === color ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <span
                      className="h-6 w-6 rounded-full"
                      style={{
                        backgroundColor:
                          color.toLowerCase() === 'white'
                            ? '#ffffff'
                            : color.toLowerCase() === 'black'
                            ? '#000000'
                            : color.toLowerCase() === 'gray'
                            ? '#808080'
                            : color.toLowerCase() === 'navy'
                            ? '#000080'
                            : color.toLowerCase() === 'beige'
                            ? '#f5f5dc'
                            : color.toLowerCase() === 'brown'
                            ? '#a52a2a'
                            : color.toLowerCase() === 'tan'
                            ? '#d2b48c'
                            : color.toLowerCase() === 'ivory'
                            ? '#fffff0'
                            : color.toLowerCase() === 'blush'
                            ? '#ffb6c1'
                            : color.toLowerCase() === 'light blue'
                            ? '#add8e6'
                            : color.toLowerCase() === 'camel'
                            ? '#c19a6b'
                            : color,
                      }}
                    ></span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Size Selection */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium">Size</h3>
              <Link href="/size-guide" className="text-sm text-gray-500 underline">
                Size Guide
              </Link>
            </div>
            <RadioGroup
              value={selectedSize}
              onValueChange={setSelectedSize}
              className="grid grid-cols-4 gap-3 sm:grid-cols-6"
            >
              {product.sizes.map(size => (
                <div key={size}>
                  <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                  <Label
                    htmlFor={`size-${size}`}
                    className={`flex h-10 cursor-pointer items-center justify-center rounded-md border text-sm font-medium ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Quantity</h3>
            <div className="flex h-10 w-32">
              <button
                type="button"
                className="flex w-10 items-center justify-center rounded-l-md border border-r-0 border-gray-300"
                onClick={decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex w-12 items-center justify-center border-y border-gray-300 text-center">
                {quantity}
              </div>
              <button
                type="button"
                className="flex w-10 items-center justify-center rounded-r-md border border-l-0 border-gray-300"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex space-x-4">
            <Button className="flex-1" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Information Tabs */}
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4 space-y-4">
              <div>
                <h4 className="font-medium">Product Features</h4>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
                  <li>Premium quality materials</li>
                  <li>Designed for comfort and style</li>
                  <li>Durable construction</li>
                  <li>Easy care instructions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Material & Care</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Machine wash cold with similar colors. Tumble dry low. Do not bleach.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="mt-4 space-y-4">
              <div>
                <h4 className="font-medium">Shipping Information</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Free standard shipping on orders over $100. Expedited and international shipping options available at
                  checkout.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Returns & Exchanges</h4>
                <p className="mt-2 text-sm text-gray-600">
                  We accept returns within 30 days of delivery. Items must be unworn, unwashed, and with original tags
                  attached.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              {/* <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviews} /> */}
              ProductReviews
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
  );
}
