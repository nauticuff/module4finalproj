'use client';

import { MutableRefObject, useRef, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { IMessage, useMessage } from '@/lib/store/messages';
import { useUser } from '@/lib/store/user';
import { supabaseBrowser } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

import MessageTextarea from './MessageTextarea';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

interface ChatInputProps {
  notification: number;
  userScrolled: boolean;
  scrollToBottom: () => void;
  userProp: User | null;
}

export default function ChatInput({
  notification,
  userScrolled,
  scrollToBottom,
  userProp
}: ChatInputProps) {
  const supabase = supabaseBrowser();
  const [message, setMessage] = useState<string>('');

  const user = useUser((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);

  const blankMessage = message.trim();

  const handleSendMessage = async (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (blankMessage === '' || !user) {
      return;
    }

    const id = uuidv4();
    const newMessage = {
      id,
      text: message,
      sent_by: user?.id,
      is_edited: false,
      created_at: new Date().toISOString(),
      users: {
        id: user?.id,
        avatar_url: user?.user_metadata.avatar_url,
        created_at: new Date().toISOString(),
        display_name: user?.user_metadata.user_name,
      },
    };

    addMessage(newMessage as IMessage);
    setOptimisticIds(newMessage.id);

    //Message kept getting displayed twice in Chat => Message because I forgot the id in { text: message, id }
    const { error } = await supabase
      .from('messages')
      .insert({ text: message, id });
    if (error) {
      toast.error(error.message);
    }
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <>
      <div className='chat-bg chat-fade relative border-t transition-all sm:-mt-[6px] sm:border-none sm:px-4 sm:pb-4 md:px-0'>
        <MessageTextarea
          props={{
            userProp,
            blankMessage,
            message,
            setMessage,
            handleKeyPress,
            handleSendMessage,
          }}
        />
        {userScrolled && (
          <div className='absolute bottom-20 sm:bottom-24 w-full '>
            {notification ? (
              <div className='mb-3 grid w-full place-items-center'>
                <Button
                  className='rounded-md border border-border bg-background px-3 py-2 text-neutral-100 transition-all hover:scale-[1.03] hover:bg-primary'
                  type='button'
                  onClick={scrollToBottom}
                >
                  {notification} new messages.
                </Button>
              </div>
            ) : (
              <></>
            )}
            <Button
              className='mx-auto flex sm:size-12 cursor-pointer items-center justify-center rounded-full border border-border bg-background p-2 transition-all hover:scale-110 hover:bg-primary'
              type='button'
              onClick={scrollToBottom}
              aria-label='scroll to bottom'
            >
              <ArrowDown  />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
