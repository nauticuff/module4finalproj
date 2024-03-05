'use client';

import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useUser } from '@/lib/store/user';
import { supabaseBrowser } from '@/lib/supabase/client';
import { IMember, useMember } from '@/lib/store/members';

export function NewChannelDialog() {
  const [channel, setChannel] = useState('');
  const user = useUser((state) => state.user);
  const { addMember, setOptimisticIds } = useMember((state) => state);
  const supabase = supabaseBrowser();

  const handleClick = async () => {
    if (user) {

      const id = uuidv4();
      const channel_id = uuidv4();
      const newMember: IMember = {
        id,
        created_at: new Date().toISOString(),
        channel_id,
        user_id: user?.id,
        role: 'ADMIN',
        channels: {
          created_at: new Date().toISOString(),
          id: channel_id,
          name: channel,
        },
      };

      const { error: channelError } = await supabase
        .from('channels')
        .insert({ id: channel_id, name: channel });

      if (channelError) {
        toast.error(channelError.message);
        // setChannel('');
        // document.getElementById('create-new-channel')?.click();
        // return;
      }

      const { error: memberError } = await supabase
        .from('members')
        .insert({ id, user_id: user?.id, channel_id, role: 'ADMIN' });

      if (memberError) {
        toast.error(memberError.message);
        // setChannel('');
        // document.getElementById('create-new-channel')?.click();
        // return;
      }

      addMember(newMember)
      setOptimisticIds(newMember.id);
      
      setChannel('');
      document.getElementById('create-new-channel')?.click();
      toast.success('Channel successfully created!')
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='hidden' id='create-new-channel'></button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create new channel.</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              placeholder='channel name'
              className='col-span-3'
              autoComplete='off'
              onChange={(e) => setChannel(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='button' onClick={handleClick}>
            Create channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
