'use client'

import Header from '@/components/Header';

interface ChatProps {
  children: React.ReactNode;
}

export default function Chat({ children }: ChatProps) {

  return (
    <div className='h-screen bg-neutral-900'>
      <div className='relative flex h-full flex-col'>
        <Header />
        <main className='flex flex-1 flex-col overflow-y-auto'>
          {children}
        </main>
      </div>
    </div>
  );
}
