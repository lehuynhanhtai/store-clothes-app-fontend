'use client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Button } from '../ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { productStore, removeProduct } from '@/store/product-store';
import { useStore } from '@tanstack/react-store';
import Image from 'next/image';

const ShoppingCart = () => {
  const cartItems = useStore(productStore, state => {
    return state.products;
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <ShoppingBag className="h-5 w-5" />
          {cartItems.length > 0 && (
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
              {productStore.state.products.length}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cartItems.length})</SheetTitle>
          <SheetDescription>Your products</SheetDescription>
          {cartItems.length === 0 ? (
            <div className="flex my-auto h-[80vh] flex-col items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
              <div className="mt-4 text-center text-gray-500">Your cart is empty</div>
              <Button className="mt-4" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex-1 py-4 scroll-smooth overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center py-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        width={200}
                        height="150"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium">
                        <h3>{item.name}</h3>
                        <span className="ml-4">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {item.colors} | {item.sizes}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        {/* <span className="text-gray-500">Qty {item.}</span> */}
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-black hover:text-gray-600 cursor-pointer"
                            onClick={() => removeProduct(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-base font-medium">
                  <span>Subtotal</span>
                  {/* <p>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p> */}
                </div>
                <span className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</span>
                <div className="mt-4">
                  <Button className="w-full" asChild>
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </div>
                <div className="mt-2 flex justify-center text-center text-sm text-gray-500">
                  <div>
                    or{' '}
                    <Link href="/products" className="font-medium text-black hover:text-gray-600">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
