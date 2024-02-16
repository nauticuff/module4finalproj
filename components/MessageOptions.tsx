'use client';

import React from 'react';
import { IMessage } from '@/lib/store/messages';
import { useMessage } from '@/lib/store/messages';
import { Menubar } from './ui/menubar';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './ui/tooltip';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';

export default function MessageOptions({ message }: { message: IMessage }) {
  
  const setActionMessage = useMessage((state) => state.setActionMessage);

  return (
    <div className='absolute -top-3 right-0'>
      <Menubar className='p-1 opacity-0 group-hover:opacity-100'>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className='p-2'
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
                onClick={() => {
                  document.getElementById('trigger-delete')?.click();
                  setActionMessage(message);
                }}
                className='p-2'
                variant={'link'}
                aria-label=''
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
};
