'use client';

import { Pencil, Trash } from 'lucide-react';

import { IMessage, useMessage } from '@/lib/store/messages';

import { Button } from './ui/button';
import { Menubar } from './ui/menubar';
import { Separator } from './ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export default function MessageOptions({ message }: { message: IMessage }) {
  const setActionMessage = useMessage((state) => state.setActionMessage);

  return (
    <div className='absolute -top-3 right-0'>
      <Menubar className='p-1 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100'>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className='p-2'
                type='button'
                onClick={() => {
                  document.getElementById('trigger-edit')?.click();
                  setActionMessage(message);
                }}
                variant={'link'}
                aria-label='edit message'
              >
                <Pencil className='size-4 text-neutral-200' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          <Separator orientation='vertical' decorative />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className='p-2'
                type='button'
                onClick={() => {
                  document.getElementById('trigger-delete')?.click();
                  setActionMessage(message);
                }}
                variant={'link'}
                aria-label='delete message'
              >
                <Trash className='size-4 text-neutral-200' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Menubar>
    </div>
  );
}
