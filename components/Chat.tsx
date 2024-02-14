'use client';

import { User } from '@supabase/supabase-js';
import Header from './Header';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
export default function Chat({ userData }: { userData: User | null }) {
  if (!userData) return <p>Log in to interact with the chat!</p>;
  return (
    <div className="rounded my-4 p-3 border-2 border-gray-700">
      <p className="mb-3 text-gray-600">(Messages will appear here)</p>
      <div className="px-11 relative">
        <Button className="absolute p-2 h-8 w-8 left-1 top-3 rounded-full inline-flex justify-center items-center" aria-label="add attachment">
          <svg
            viewBox="0 0 256 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 stroke-black"
          >
            <path
              d="M42.6665 128H213.333M128 42.6666V213.333"
              strokeWidth="21.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Button>
        <Textarea className="resize-none"></Textarea>
        <Button aria-lab></Button>
      </div>
    </div>
  );
}
