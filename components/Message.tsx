import Image from 'next/image';

import { IMessage } from '@/lib/store/messages';
import { formatDate } from '@/lib/utils';

export default function Message({
  message,
  children,
}: {
  message: IMessage;
  children?: React.ReactNode;
}) {
  return (

    <div>
      <div className='group flex gap-4'>
        <div>
          <Image
            className='mt-1 rounded-full ring-2'
            src={message.users?.avatar_url!}
            alt={message.users?.avatar_url + "'s avatar"}
            width={50}
            height={50}
          />
        </div>
        <div className='relative flex flex-1 flex-col gap-1'>
          <div className='flex justify-between'>
            <div className='flex items-baseline gap-2'>
              <p className='font-bold'>{message.users?.display_name}</p>
              <p className='text-xs text-neutral-400'>
                {formatDate(message.created_at)}
              </p>
            </div>
            {children}
          </div>
          <p className='whitespace-pre-wrap text-neutral-300'>{message.text}</p>
        </div>
      </div>
    </div>
    
  );
}
