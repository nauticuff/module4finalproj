'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import ChatPresence from './ChatPresence';
import { useUser } from '@/lib/store/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { useEffect } from 'react';
import { useMember } from '@/lib/store/members';
import ChannelsDropdown from './ChannelsDropdown';

export default function Header() {
  const router = useRouter();
  const { members, optimisticIds, addMember, setMembers, setOptimisticIds, deleteChannel } = useMember((state) => state)
  const user = useUser((state) => state.user)
  const resetUser = useUser((state) => state.resetUser);

  const supabase = supabaseBrowser();

  const handleLogin = () => {
    try {
      supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      router.push('/');
      toast.error('Error logging in. Please try again.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    resetUser();

    router.refresh();
  };

  useEffect(() => {
    const channel = supabase
    .channel('chat-room1')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'channels' }, payload => {
      console.log('Channel created: ', payload)
    })
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'channels' }, payload => {
      console.log('Channel deleted: ', payload)
      deleteChannel(payload.old.id)
    })
    .subscribe()
    // const channel = supabase
    //   .channel('chat-room')
    //   .on(
    //     'postgres_changes',
    //     { event: 'INSERT', schema: 'public', table: 'members' },
    //     async (payload) => {
    //       console.log('Change received!', payload)
    //       if (!optimisticIds.includes(payload.new.id)) {
    //         const { data, error } = await supabase
    //           .from('channels')
    //           .select('*')
    //           .eq('id', payload.new.sent_by)
    //           .single();
    //         if (error) {
    //           toast.error(error.message);
    //         } else {
    //           const newMessage = {
    //             ...payload.new,
    //             users: data,
    //           };
    //           addMessage(newMessage as IMessage);
    //         }
    //       }
    //       const scrollContainer = scrollRef.current;
    //       const didScroll =
    //         scrollContainer.scrollTop <
    //         scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
    //       //add a check to make sure
    //       //message sent by is not by the one currently logged in
    //       const latestMessage = messages[messages.length - 1];
    //       if (didScroll && latestMessage.sent_by !== user?.id) {
    //         setNotification((current) => current + 1);
    //       }
    //     },
    //   )
    //   .on(
    //     'postgres_changes',
    //     { event: 'DELETE', schema: 'public', table: 'messages' },
    //     (payload) => {
    //       deleteMessage(payload.old.id);
    //     },
    //   )
    //   .on(
    //     'postgres_changes',
    //     { event: 'UPDATE', schema: 'public', table: 'messages' },
    //     (payload) => {
    //       editMessage(payload.new as IMessage);
    //     },
    //   )
    //   .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [members]);

  return (
    <header className='flex h-[73px] items-center justify-between gap-4 border-b border-neutral-800 bg-background px-5 py-3 lg:px-8 2xl:px-[10%]'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-gray-100'>
          Supa<span className='font-bold text-primary'>Chat</span>
        </h1>
        <ChatPresence />
      </div>
      <div className='flex items-center justify-around gap-2'>
        {user ? (
          <>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type='button' variant='secondary'>
                  Channels
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My channels</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {members.map((channel, idx) => (
                  <DropdownMenuItem className='p-0' key={idx}>
                    <Link className='size-full px-2 py-1.5' href={`/channel/${channel.channels?.id}`}>
                      {channel.channels?.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu> */}
            <ChannelsDropdown members={members}/>

            <Button
              type='button'
              variant='secondary'
              onClick={() => {
                document.getElementById('create-new-channel')?.click();
              }}
            >
              New channel
            </Button>
            <Button
              className='py-0 md:py-4'
              variant='secondary'
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button className='py-2 md:py-4' onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
