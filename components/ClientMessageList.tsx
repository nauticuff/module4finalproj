'use client';

import { useMessage } from '@/lib/store/messages';
import Message from './Message';
import DeleteAlert from './MessageActions';
import MessageOptions from './MessageOptions';

export default function ClientMessageList() {
  const messages = useMessage((state) => state.messages);

  return (
    <div>
      {messages.map((message, idx) => (
        <div key={idx}>
          <Message message={message}>
            <MessageOptions message={message}/>
          </Message>
          {idx !== messages.length - 1 && <hr className='my-5' />}
        </div>
      ))}
      <DeleteAlert />
    </div>
  );
}
