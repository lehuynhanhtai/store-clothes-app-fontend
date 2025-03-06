'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset request
    try {
      // In a real app, you would call your password reset API here
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitted(true);

      toast('Check your email for instructions to reset your password');
    } catch {
      toast('There was an error sending the reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="mt-2 text-gray-600">
            {isSubmitted
              ? "We've sent you an email with instructions to reset your password."
              : "Enter your email and we'll send you a link to reset your password."}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-700">
              <p>
                If an account exists with the email <strong>{email}</strong>, you will receive a password reset link
                shortly.
              </p>
              <p className="mt-2">Please check your inbox and spam folder. The link will expire in 1 hour.</p>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
            >
              Try another email
            </Button>
          </div>
        )}

        <div className="text-center">
          <Link href="/auth/signin" className="inline-flex items-center text-sm text-gray-600 hover:text-black">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
