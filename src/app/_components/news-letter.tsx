"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast("Successfully subscribed!");
    }, 1000);
  };

  return (
    <section className="bg-gray-100 py-16 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Subscribe to Our Newsletter</h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Stay updated with our latest collections, exclusive offers, and style tips.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;