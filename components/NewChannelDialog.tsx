'use client';

import { v4 as uuidv4 } from 'uuid';

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
import { supabaseBrowser } from '@/lib/supabase/client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/lib/store/user';

export function NewChannelDialog() {
  const [channel, setChannel] = useState('');
  const user = useUser((state) => state.user);

  const supabase = supabaseBrowser();

  supabase.from('');
  const handleClick = async () => {
    const channelId = uuidv4();

    const { error: channelError } = await supabase
      .from('channels')
      .insert({ name: channel, id: channelId });

    if (channelError) {
      toast.error(channelError.message);
      // setChannel('');
      // document.getElementById('create-new-channel')?.click();
      // return;
    }

    const { error: memberError } = await supabase
      .from('members')
      .insert({ user_id: user?.id, channels_id: channelId, role: 'ADMIN' });

    if (memberError) {
      toast.error(memberError.message);
      // setChannel('');
      // document.getElementById('create-new-channel')?.click();
      // return;
    }

    setChannel('');
    document.getElementById('create-new-channel')?.click();
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
