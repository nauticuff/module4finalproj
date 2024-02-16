'use client';

import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useMessage } from '@/lib/store/messages';
import { supabaseBrowser } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useUser } from '@/lib/store/user';
import Message from './Message';
import MessageOptions from './MessageOptions';

export default function DeleteAlert() {
  const actionMessage = useMessage((state) => state.actionMessage);
  const deleteMessage = useMessage((state) => state.deleteMessage);
  const user = useUser((state) => state.user);
  const handleDelete = async () => {
    const supabase = supabaseBrowser();
    deleteMessage(actionMessage?.id!);

    const { data, error } = await supabase
      .from('messages')
      .delete()
      .eq('id', actionMessage?.id!);
    if (error) {
      toast.error('There was a problem deleting your message. Try again.');
    } else {
      toast.success('Message succesfully deleted.');
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className='hidden' id='trigger-delete'></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <p className='mb-5'>
              This action cannot be undone. This will permanently delete your
              message from our servers.
            </p>

            {actionMessage && (
              <ScrollArea className='h-fit max-h-44 rounded-md border border-border px-2 pt-2'>
                <Message message={actionMessage} />
              </ScrollArea>
              // <div className='border border-border px-2 py-4 my-2 rounded-md max-h-32 overflow-y-auto'>
              // </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
