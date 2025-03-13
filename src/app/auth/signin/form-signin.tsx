'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import SubmitButton from '@/components/ui/submit-button';
import { signIn } from '@/lib/auth';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useState } from 'react';

const FormSignin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useActionState(signIn, undefined);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/auth/forgot-password" className="text-xs text-gray-600 hover:text-black">
              Forgot password?
            </Link>
          </div>
          <div className="relative mt-1">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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
        </div>
      </div>

      <SubmitButton>Sign In</SubmitButton>

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
        Dont have an account?
        <Link href="/auth/signup" className="font-medium text-black hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default FormSignin;
