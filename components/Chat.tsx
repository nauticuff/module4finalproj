'use client'

import Sidebar from '@/components/Sidebar';

interface ChatProps {
  children: React.ReactNode;
}

export default function Chat({ children }: ChatProps) {

  return (
    <div className='bg-neutral-900'>
      <div className='relative flex'>
        {/* <Sidebar /> */}
        <main className='flex flex-1 flex-col overflow-y-auto'>
          {children}
        </main>
      </div>
    </div>
  );
}
