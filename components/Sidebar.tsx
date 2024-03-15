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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet';
import { MenuIcon } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const {
    members,
    optimisticIds,
    addMember,
    setMembers,
    setOptimisticIds,
    deleteChannel,
  } = useMember((state) => state);
  const user = useUser((state) => state.user);
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
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'channels' },
        (payload) => {
          // console.log('Channel created: ', payload)
          // addMember(payload.old.id)
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'channels' },
        (payload) => {
          // console.log('Channel deleted: ', payload)
          deleteChannel(payload.old.id);
        },
      )
      .subscribe();
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
    <>
      <nav className='Xlg:px-8 X2xl:px-[10%] flex w-full items-center justify-between gap-10 border-b border-neutral-800 bg-background px-5 py-3 sm:w-60 sm:flex-col sm:items-start sm:justify-normal'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-gray-100'>
            Supa<span className='font-bold text-primary'>Chat</span>
          </h1>
          <ChatPresence />
        </div>
        <div className='flex sm:w-full sm:flex-1 sm:flex-col'>
          {user ? (
            <>
              <Sheet>
                <SheetTrigger className='sm:hidden'>
                  <MenuIcon />
                </SheetTrigger>
                <SheetContent side='left' className='flex flex-col pt-20'>
                  <div className='flex flex-1 flex-col gap-2 sm:w-full'>
                    <ChannelsDropdown className='' members={members} />
                    <Button
                      className='w-full'
                      type='button'
                      variant='secondary'
                      onClick={() => {
                        document.getElementById('create-new-channel')?.click();
                      }}
                    >
                      New channel
                    </Button>
                  </div>
                  <Button
                    className='w-full py-0 md:py-4'
                    variant='secondary'
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </SheetContent>
              </Sheet>
              <div className='hidden h-full flex-col gap-2 sm:flex'>
                <ChannelsDropdown members={members} />
                <Button
                  className='w-full'
                  type='button'
                  variant='secondary'
                  onClick={() => {
                    document.getElementById('create-new-channel')?.click();
                  }}
                >
                  New channel
                </Button>
              </div>
              <Button
                className='hidden w-full sm:block'
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
      </nav>
    </>
  );
}
