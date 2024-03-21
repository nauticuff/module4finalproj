'use client';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import {
  Briefcase,
  ChevronDown,
  ChevronRight,
  HashIcon,
  Home,
  LucideShieldEllipsis,
  Menu,
  MenuIcon,
  MessagesSquare,
  Plus,
  User2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMember } from '@/lib/store/members';
import { useUser } from '@/lib/store/user';
import { supabaseBrowser } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

import ChannelsDropdown from './ChannelsDropdown';
import ChatPresence from './ChatPresence';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Separator } from './ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from './ui/sheet';
import { Meatball } from './icons';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

// import Link from 'next/link';
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
  const [isOpen, setIsOpen] = useState(false);

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
      <nav id='desktop' className='hidden bg-neutral-900 p-5 sm:block'>
        <div className='flex flex-col items-center justify-center gap-1 text-xs font-medium'>
          {/* <Button
            variant='default'
            onClick={() => {
              document.getElementById('view-workspace')?.click();
            }}
          >
            <Briefcase className='size-5' />
          </Button> */}
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger aria-label='view workspace'>
                <Briefcase className='size-5' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='min-w-60 max-w-sm'>
                <DropdownMenuLabel className='font-bold'>
                  Bay Valley Tech
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='flex items-start gap-2 hover:cursor-pointer'>
                  {/* <div className='mt-0.5'> */}
                  <Briefcase className='mt-0.5 size-5' />
                  {/* </div> */}
                  <Link href={''}>Interns</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-start gap-2 hover:cursor-pointer'>
                  {/* <div className='mt-0.5'> */}
                  <Briefcase className='mt-0.5 size-5' />
                  {/* </div> */}
                  <Link href={''}>Bay Valley Tech Code Academy</Link>
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem className='gap-2 hover:cursor-pointer'>
                    <Plus className='size-5' /> Add a workspace
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className='gap-8 overflow-hidden p-0'>
              <DialogHeader className='px-6 pt-4'>
                <DialogTitle className='text-xl font-bold'>
                  Add a workspace
                </DialogTitle>
                <DialogDescription>
                  Create a workspace to chat with your coworkers on important
                  topics.
                </DialogDescription>
              </DialogHeader>
              <Button
                variant='ghost'
                className='mx-6 flex items-center justify-between rounded border border-border'
              >
                Create a new workspace <ChevronRight className='size-6' />
              </Button>
              <div className='w-full bg-neutral-900 px-6 py-4'>
                <h2 className='mb-6 w-full text-center'>
                  Have an invite already?
                </h2>
                <Button className='w-full'>Join workspace</Button>
              </div>
              {/* <Tabs defaultValue='server-question' className='w-full'>
                <TabsList>
                  <TabsTrigger value='server-question'>Account</TabsTrigger>
                  <TabsTrigger value='password'>Password</TabsTrigger>
                </TabsList>
                <TabsContent value='account'>
                  Make changes to your account here.
                </TabsContent>
                <TabsContent value='password'>
                  Change your password here.
                </TabsContent>
              </Tabs> */}
            </DialogContent>
          </Dialog>
        </div>
        <Separator className='my-4 bg-secondary-foreground' />
        <div className='flex flex-col items-center gap-5'>
          <div className='flex flex-col items-center justify-center gap-1 text-xs font-medium'>
            <Home /> Home
          </div>
          <div className='flex flex-col items-center justify-center gap-1 text-xs font-medium'>
            <MessagesSquare /> DMs
          </div>
        </div>
      </nav>
      <nav className='flex w-full items-center justify-between gap-10 border-b border-neutral-800 bg-background py-3 pl-4 pr-3 sm:w-60 sm:flex-col sm:items-start sm:justify-normal sm:px-0'>
        {/* <div className='flex flex-col gap-1 sm:px-3'>
          <Link href='/' className='text-gray-100'>
            Supa<span className='font-bold text-primary'>Chat</span>
          </Link>
          <ChatPresence />
        </div> */}
        <div className='flex sm:w-full sm:flex-1 sm:flex-col'>
          {user ? (
            <>
              <Sheet>
                <SheetTrigger className='sm:hidden' aria-label='open menu'>
                  <MenuIcon />
                </SheetTrigger>
                <SheetContent
                  side='left'
                  className='flex w-11/12 gap-0 px-0 pb-0 pt-14'
                >
                  <nav id='mobile' className='bg-neutral-900 p-5'>
                    <div className='flex flex-col items-center justify-center gap-1 text-xs font-medium'>
                      {/* <Button
            variant='default'
            onClick={() => {
              document.getElementById('view-workspace')?.click();
            }}
          >
            <Briefcase className='size-5' />
          </Button> */}
                      {/* <SheetClose asChild>
                        
                      </SheetClose> */}
                      <Popover modal>
                        <PopoverTrigger>
                          <Briefcase className='size-5' />
                        </PopoverTrigger>
                        <PopoverContent side='bottom' className='bg-neutral-700'>
                          Place content for the popover here.
                        </PopoverContent>
                      </Popover>

                      {/* <Drawer>
                        <DrawerTrigger aria-label='open'>
                          <Meatball />
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>
                              This action cannot be undone.
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                              <Button variant='outline'>Cancel</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer> */}

                      {/* implement maybe in future... */}
                      {/* <Tabs defaultValue='server-question' className='w-full'>
                <TabsList>
                  <TabsTrigger value='server-question'>Account</TabsTrigger>
                  <TabsTrigger value='password'>Password</TabsTrigger>
                </TabsList>
                <TabsContent value='account'>
                  Make changes to your account here.
                </TabsContent>
                <TabsContent value='password'>
                  Change your password here.
                </TabsContent>
              </Tabs> */}
                    </div>
                    <Separator className='my-4 bg-secondary-foreground' />
                    <div className='flex flex-col items-center gap-5'>
                      <div className='flex flex-col items-center justify-center gap-1 text-xs font-medium'>
                        <Home /> Home
                      </div>
                      <div className='flex flex-col items-center justify-center gap-1 text-xs font-medium'>
                        <MessagesSquare /> DMs
                      </div>
                      <div className='flex flex-col items-center justify-center gap-1 text-xs font-medium'>
                        <Plus className='size-9 rounded-full bg-secondary p-2 text-primary' />
                      </div>
                    </div>
                  </nav>
                  <div className='flex flex-1 flex-col gap-2 sm:w-full'>
                    <div className='flex w-full items-center justify-between px-4'>
                      <h1 className='font-bold'>Bay Valley Tech</h1>
                      <Drawer>
                        <DrawerTrigger aria-label='open'>
                          <Meatball />
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>
                              This action cannot be undone.
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                              <Button variant='outline'>Cancel</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </div>
                    <Collapsible
                      open={isOpen}
                      onOpenChange={setIsOpen}
                      className='my-2 w-full'
                    >
                      <CollapsibleTrigger asChild>
                        <div className='group flex items-center text-neutral-400'>
                          <Button
                            variant='ghost'
                            className='h-fit w-full justify-start gap-1 px-2 py-1.5 hover:bg-transparent focus-visible:ring-inset'
                          >
                            <ChevronRight className='h-4 w-4 transition-transform group-data-[state=open]:rotate-90' />
                            <h4 className='text-sm font-semibold '>Channels</h4>
                          </Button>
                        </div>
                      </CollapsibleTrigger>
                      {/* Make sure display is only "On" when the content is data-state=open
                         Or else it will remount the element and cause problems
                      */}
                      <CollapsibleContent
                        asChild
                        className='flex-col overflow-hidden px-3 data-[state=open]:flex data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down'
                      >
                        <ul className='gap-1 py-1'>
                          {members.map((channel) => (
                            <li
                              key={channel.channel_id}
                              className='flex items-center gap-1 rounded  text-neutral-400 transition-colors hover:cursor-pointer hover:bg-secondary hover:text-neutral-100'
                            >
                              <Link
                                className='inline-flex w-full items-center gap-2 px-2.5 py-1'
                                href={`/channels/${channel.channels?.id}`}
                              >
                                <HashIcon className='size-5' />
                                {channel.channels?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                    {/* <ChannelsDropdown className='' members={members} /> */}
                    {/* <Button
                      className='w-full'
                      type='button'
                      variant='secondary'
                      onClick={() => {
                        document.getElementById('create-new-channel')?.click();
                      }}
                    >
                      New channel
                    </Button> */}
                    <Button
                      className='w-full py-0 md:py-4'
                      variant='secondary'
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                  {/* <SheetFooter>
                    <SheetClose asChild>
                      <Button type='submit'>Save changes</Button>
                    </SheetClose>
                  </SheetFooter> */}
                </SheetContent>
              </Sheet>
              <div className='hidden h-full flex-col gap-2 sm:flex'>
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className='my-2 w-full'
                >
                  <CollapsibleTrigger asChild>
                    <div className='group flex items-center text-neutral-400'>
                      <Button
                        variant='ghost'
                        className='h-fit w-full justify-start gap-1 px-2 py-1.5 hover:bg-transparent focus-visible:ring-inset'
                      >
                        <ChevronRight className='h-4 w-4 transition-transform group-data-[state=open]:rotate-90' />
                        <h4 className='text-sm font-semibold '>Channels</h4>
                      </Button>
                    </div>
                  </CollapsibleTrigger>
                  {/* Make sure display is only "On" when the content is data-state=open
                    Or else it will remount the element and cause problems
                  */}
                  <CollapsibleContent
                    asChild
                    className='flex-col overflow-hidden px-3 data-[state=open]:flex data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down'
                  >
                    <ul className='gap-1 py-1'>
                      {members.map((channel) => (
                        <li
                          key={channel.channel_id}
                          className='flex items-center gap-1 rounded  text-neutral-400 transition-colors hover:cursor-pointer hover:bg-secondary hover:text-neutral-100'
                        >
                          <Link
                            className='inline-flex w-full items-center gap-2 px-2.5 py-1'
                            href={`/channels/${channel.channels?.id}`}
                          >
                            <HashIcon className='size-5' />
                            {channel.channels?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
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
