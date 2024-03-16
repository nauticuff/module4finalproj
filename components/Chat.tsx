'use client';

import Sidebar from '@/components/Sidebar';

interface ChatProps {
  children: React.ReactNode;
}

export default function Chat({ children }: ChatProps) {
  return (
    <div className='flex flex-1 flex-col overflow-y-auto bg-neutral-900'>
      <main className='flex flex-col overflow-y-auto'>{children}</main>
    </div>
  );
}
