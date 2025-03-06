'use client';

import Link from 'next/link';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ConfirmationPage() {
  // Generate a random order number

  // Calculate estimated delivery date (7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold">Order Confirmed!</h1>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className="mt-8 rounded-lg border p-6 text-left">
          <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div>
              <div className="text-sm text-gray-500">Order Number</div>
              <div>{'abc'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Order Date</div>
              <div className="font-medium">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <h2 className="mb-4 text-lg font-semibold">Order Status</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium">Order Confirmed</p>
                <p className="text-sm text-gray-500">Your order has been received and is being processed.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-gray-100 p-2">
                <Package className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Processing</p>
                <p className="text-sm text-gray-500">Your order is being prepared for shipping.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-gray-100 p-2">
                <Truck className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Shipped</p>
                <p className="text-sm text-gray-500">Your order will be shipped soon.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-gray-100 p-2">
                <Calendar className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-sm text-gray-500">{formattedDeliveryDate}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              A confirmation email has been sent to your email address with all the details of your order.
            </p>
            <p className="text-sm text-gray-500">
              If you have any questions about your order, please contact our customer service team.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild className="flex-1">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link href="/account/orders">View Order History</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
