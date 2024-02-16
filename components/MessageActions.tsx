'use client';

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
} from '@/components/ui/alert-dialog';
import { useMessage } from '@/lib/store/messages';
import { supabaseBrowser } from '@/lib/supabase/client';

import Message from './Message';
import {
  ScrollArea,
  ScrollBar,
  ScrollCorner,
  ScrollThumb,
  ScrollViewport,
} from './ui/scroll-area';

export default function DeleteAlert() {

  const actionMessage = useMessage((state) => state.actionMessage);
  const deleteMessage = useMessage((state) => state.deleteMessage);
  const handleDelete = async () => {
    const supabase = supabaseBrowser();
    deleteMessage(actionMessage?.id!);

    const { error } = await supabase
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
              This action cannot be undone. This will permanently delete your
              message from our servers.
          </AlertDialogDescription>
          {actionMessage && (
              <ScrollArea className='rounded-md border border-border pt-4 pb-5 px-4'>
                <ScrollViewport className='max-h-52'>
                  <Message message={actionMessage} />
                </ScrollViewport>
                <ScrollBar>
                  <ScrollThumb />
                </ScrollBar>
                <ScrollCorner />
              </ScrollArea>
            )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

}
