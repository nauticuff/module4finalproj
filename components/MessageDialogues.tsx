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
import { Textarea } from './ui/textarea';

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
  const editRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const editMessage = useMessage((state) => state.editMessage);

  const handleEdit = async () => {
    const supabase = supabaseBrowser();
    const text = editRef.current.value.trim();
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
      <DialogContent className='md:max-w-xl max-w-xs'>
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
        </DialogHeader>
        <div className='max-h-60 border-input grow rounded-md flex flex-col py-3 px-2 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-ring has-[:focus]:ring-offset-2 has-[:focus]:ring-offset-neutral-900'>

        <Textarea
          rows={1}
          spellCheck={false}
          className='resize-none min-h-0 px-2 py-0 border-none focus-within:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
          defaultValue={actionMessage?.text}
          ref={editRef}
          />
          </div>

        {/* <Input defaultValue={actionMessage?.text} ref={inputRef} /> */}
        <DialogFooter>
          <Button type='submit' onClick={handleEdit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
