'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Next.js App</h1>
      <button 
        onClick={handleLoginClick}
        className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
      >
        Go to Login
      </button>
    </main>
  );
}