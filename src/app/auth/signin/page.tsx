import FormSignin from './form-signin';

export default function SignInPage() {
  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="mt-2 text-gray-600">Welcome back! Please enter your details.</p>
        </div>

        <FormSignin />
      </div>
    </div>
  );
}
