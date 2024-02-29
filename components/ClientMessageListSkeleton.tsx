import React from 'react'

export default function ClientMessageListSkeleton() {
  return (
    <>
    {[1, 2, 4, 5, 6, 7, 8].map((message, idx) => (
      <div key={idx} className='flex items-start gap-4 p-2 h-20'>
      <div>
        {/* Skeleton for user avatar */}
        <div className='rounded-full bg-neutral-600 animate-pulse size-9 xs:size-11'></div>
      </div>
      <div className='relative flex flex-1 flex-wrap flex-col gap-1'>
        <div className='flex justify-between'>
          <div className='flex items-baseline gap-2'>
            {/* Skeleton for user name */}
            <div className='bg-neutral-600 animate-pulse h-3 w-20 xs:w-24'></div>
            {/* Skeleton for timestamp */}
            <div className='bg-neutral-600 animate-pulse h-3 w-12 xs:w-20'></div>
          </div>
        </div>
        {/* Skeleton for message text */}
        <div className='bg-neutral-600 animate-pulse h-5 w-full xs:w-11/12'></div>
      </div>
    </div>
    ))}
    </>
  )
}
