import React, { SetStateAction } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { PlusIcon } from 'lucide-react';
import { SendIcon } from 'lucide-react';

interface IMessageTextareaProps {
  blankMessage: string;
  message: string;
  setMessage: React.Dispatch<SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: (e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MessageTextarea({
  props,
}: {
  props: IMessageTextareaProps;
}) {
  return (
    <form>
      <div className='relative mx-auto flex max-h-60 grow flex-col overflow-hidden bg-zinc-900 px-16 py-5 shadow-sm sm:max-w-xl sm:rounded-lg sm:border'>
        <Button
          type='button'
          className='absolute left-4 top-3 inline-flex size-8 items-center justify-center rounded-full p-2'
          aria-label='add attachment'
        >
          <PlusIcon color='white' className='size-5' />
        </Button>
        <Textarea
          value={props.message}
          //you need 'focus-visible:ring-0 focus-visible:ring-offset-0' to be able to use 'focus-within:outline-none'
          className='min-h-0 resize-none border-none bg-transparent px-2 py-0 focus-within:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
          rows={1}
          spellCheck={false}
          placeholder='Send a message'
          onChange={(e) => props.setMessage(e.target.value)}
          onKeyDown={(e) => props.handleKeyPress(e)}
        />
        <Button
          type='button'
          className='absolute right-4 top-3 size-8 p-2'
          onClick={props.handleSendMessage}
          aria-label='Send message'
          disabled={props.blankMessage === ''}
        >
          <SendIcon color='white' className='size-5' />
        </Button>
      </div>
    </form>
  );
}
