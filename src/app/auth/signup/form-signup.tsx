'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import SubmitButton from '@/components/ui/submit-button';
import { signUp } from '@/lib/auth';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useState } from 'react';

const FormSignUp = () => {
  const [state, formAction] = useActionState(signUp, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6" action={formAction}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" type="text" placeholder="First name" required className="mt-1" />
            {state?.error?.firstName && <p className="mt-1 text-xs text-red-500">{state.error.firstName}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" type="text" placeholder="Last name" required className="mt-1" />
            {state?.error?.lastName && <p className="mt-1 text-xs text-red-500">{state.error.lastName}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="account">Account</Label>
          <Input
            id="account"
            name="account"
            type="account"
            placeholder="Enter your account"
            required
            className="mt-1"
          />
          {state?.error?.account && <p className="mt-1 text-xs text-red-500">{state.error.account}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              required
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {state?.error?.password && <p className="mt-1 text-xs text-red-500">{state.error.password}</p>}
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox id="agreeToTerms" name="agreeToTerms" className="mt-1" required />
          <Label htmlFor="agreeToTerms" className="text-sm font-normal">
            I agree to the{' '}
            <Link href="/terms-of-service" className="text-black underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-black underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
      </div>

      <SubmitButton>Sign up</SubmitButton>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" className="w-full">
          Google
        </Button>
        <Button variant="outline" type="button" className="w-full">
          Apple
        </Button>
      </div>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/auth/signin" className="font-medium text-black hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default FormSignUp;
