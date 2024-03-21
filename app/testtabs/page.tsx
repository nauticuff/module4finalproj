'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';

export default function page() {
  return (
    <div>
      <Tabs defaultValue='server-question' className='w-full'>
        <TabsList>
          <TabsTrigger value='server-question'>Account</TabsTrigger>
          <TabsTrigger value='create-new-server'>Password</TabsTrigger>
          <TabsTrigger value='join-with-link'>Password</TabsTrigger>
        </TabsList>
        <TabsContent value='server-question'>
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
                  Create a workspace to chat with you coworkers on important
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
            </DialogContent>
          </Dialog>
        </TabsContent>
        <TabsContent value='create-new-server'>Create new server</TabsContent>
        <TabsContent value='join-with-link'>Join with link</TabsContent>
      </Tabs>
    </div>
  );
}
