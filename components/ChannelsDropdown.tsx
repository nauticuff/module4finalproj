'use client';

import { cn } from '@/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import Link from 'next/link';

import { IMember, useMember } from '@/lib/store/members';
import { Trash } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useUser } from '@/lib/store/user';

interface ChannelsDropdownProps {
  members: IMember[];
  className?: string | undefined;
}
export default function ChannelsDropdown({ members, className }: ChannelsDropdownProps) {
  const setActionChannel = useMember((state) => state.setActionChannel);
  const user = useUser((state) => state.user)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type='button' variant='secondary'>
            Channels
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My channels</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {members.length > 0 ? (members.map((member, idx) => (
            <DropdownMenuItem
              className='flex items-center justify-between gap-1 p-0'
              key={idx}
            >
              <Link
                className='px-2 py-1.5'
                href={`/channel/${member.channels?.id}`}
              >
                {member.channels?.name}
              </Link>
              {member.role === 'ADMIN' &&
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className='px-2 py-1.5'>
                    <Trash
                      className='size-4'
                      aria-label='delete channel'
                      onClick={() => {
                        document.getElementById('delete-channel')?.click();
                        setActionChannel(member);
                      }}
                      />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
                  }
            </DropdownMenuItem>
          ))) : ( <DropdownMenuItem disabled>No channels</DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
