'use client';

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
import { IMessage, useMessage } from '@/lib/store/messages';
import { supabaseBrowser } from '@/lib/supabase/client';

import Message from './Message';
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
import {
  ScrollArea,
  ScrollBar,
  ScrollCorner,
  ScrollThumb,
  ScrollViewport,
} from './ui/scroll-area';
import { useRef } from 'react';

export function DeleteAlert() {
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
        <AlertDialogHeader className='space-y-3'>
          <AlertDialogTitle>Delete message?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            message from our servers.
          </AlertDialogDescription>
          {actionMessage && (
            <ScrollArea className='rounded-md border border-border p-4 pb-5'>
              <ScrollViewport className='max-h-64'>
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

export function EditAlert() {
  const actionMessage = useMessage((state) => state.actionMessage);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const editMessage = useMessage((state) => state.editMessage);

  const handleEdit = async () => {
    const supabase = supabaseBrowser();
    const text = inputRef.current.value.trim();
    if (text) {
      editMessage({
        ...actionMessage,
        text,
        is_edited: true,
      } as IMessage);

      const { error } = await supabase
        .from('messages')
        .update({ text, is_edited: true })
        .eq('id', actionMessage?.id!);
      if (error) {
        toast.error('There was a problem updating your message. Try again.');
      } else {
        toast.success('Message updated succesfully.');
      }
      document.getElementById('trigger-edit')?.click();
    } else {
      document.getElementById('trigger-edit')?.click();
      document.getElementById('trigger-delete')?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id='trigger-edit'></button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
        </DialogHeader>
        <Input defaultValue={actionMessage?.text} ref={inputRef} />
        <DialogFooter>
          <Button type='submit' onClick={handleEdit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
