import React from 'react';

export default function MessagesSkeleton() {
  return (
    <div className='h-full flex flex-col gap-4'>
      {[1, 2, 3, 4, 5, 6, 7].map((message, idx) => (
        <div key={idx} className='flex h-20 items-start gap-4 p-2'>
          <div>
            {/* Skeleton for user avatar */}
            <div className='size-9 animate-pulse rounded-full bg-neutral-600 xs:size-11'></div>
          </div>
          <div className='relative flex flex-1 flex-col flex-wrap gap-1'>
            <div className='flex justify-between'>
              <div className='flex items-baseline gap-2'>
                {/* Skeleton for user name */}
                <div className='h-3 w-20 animate-pulse bg-neutral-600 xs:w-24 rounded'></div>
                {/* Skeleton for timestamp */}
                <div className='h-3 w-12 animate-pulse bg-neutral-600 xs:w-20 rounded'></div>
              </div>
            </div>
            {/* Skeleton for message text */}
            <div className='h-5 w-full animate-pulse bg-neutral-600 xs:w-11/12 rounded'></div>
          </div>
        </div>
      ))}
    </div>
  );
}
