'use client';
import FormSignIn from './form-signin';

export default function SignUpPage() {
  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="mt-2 text-gray-600">Join MINIMALIST to shop our curated collection.</p>
        </div>
        <FormSignIn />
      </div>
    </div>
  );
}
