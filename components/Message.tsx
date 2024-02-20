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
    <div className='flex items-start gap-4 p-2'>
      <div>
        <Image
          className='rounded-full'
          src={message.users?.avatar_url!}
          alt={message.users?.avatar_url + "'s avatar"}
          width={46}
          height={46}
        />
      </div>
      <div className='relative flex flex-1 flex-wrap flex-col gap-1'>
        <div className='flex justify-between'>
          <div className='flex items-baseline gap-2'>
            <p className='font-bold text-neutral-200'>
              {message.users?.display_name}
            </p>
            <p className='text-xs text-neutral-400'>
              {formatDate(message.created_at)}
            </p>
          </div>
          {children}
        </div>
        <p className='[word-break:break-word] whitespace-pre-wrap text-neutral-300'>
          {message.text}
          {message.is_edited && (
            <span className='text-[10px] text-gray-400'> (edited)</span>
          )}
        </p>
      </div>
    </div>
  );
}
