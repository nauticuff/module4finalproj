'use client'

import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { useMember } from '@/lib/store/members';
import { supabaseBrowser } from '@/lib/supabase/client';

export function DeleteChannelAlert() {
  const actionChannel = useMember((state) => state.actionChannel);
  const deleteChannel = useMember((state) => state.deleteChannel);
  // console.log(actionChannel)
  const handleDelete = async () => {
    const supabase = supabaseBrowser();
    
    const { error } = await supabase
    .from('channels')
    .delete()
    .eq('id', actionChannel?.channels?.id!);
    console.log(error)
    if (error) {
      toast.error('There was a problem deleting your channel. Try again.');
      return
    } else {
      toast.success(`Channel ${actionChannel?.channels?.name!} succesfully deleted.`);
    }
    deleteChannel(actionChannel?.channels?.id!);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className='hidden' id='delete-channel'></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className='space-y-3'>
          <AlertDialogTitle>Delete channel?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this channel from our database.
          </AlertDialogDescription>
          <p className='py-2 px-4 bg-secondary text-sm rounded'>{actionChannel?.channels?.name}</p>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
