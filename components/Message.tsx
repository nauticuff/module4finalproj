import { IMessage, useMessage } from '@/lib/store/messages';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Button } from './ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';

import { MoreHorizontalIcon, Pencil, Trash } from 'lucide-react';
import { useUser } from '@/lib/store/user';

export default function Message({ message, children }: { message: IMessage, children?: React.ReactNode }) {
  const user = useUser((state) => state.user);
  return (
    <div>
      <div className='group flex gap-4'>
        <div>
          <Image
            className='mt-1 rounded-full ring-2'
            src={message.users?.avatar_url!}
            alt={message.users?.avatar_url + "'s avatar"}
            width={50}
            height={50}
          />
        </div>
        <div className='relative flex flex-1 flex-col gap-1'>
          <div className='flex justify-between'>
            <div className='flex items-baseline gap-2'>
              <p className='font-bold'>{message.users?.display_name}</p>
              <p className='text-xs text-neutral-400'>
                {formatDate(message.created_at)}
              </p>
            </div>
            {children}
            {/* {message.users?.id === user?.id && (
              <div className='absolute -top-3 right-0'>
                <Menu message={message} />
              </div>
            )} */}
          </div>
          <p className='text-neutral-300'>{message.text}</p>
        </div>
      </div>
    </div>
  );
}

// const Menu = ({ message }: { message: IMessage }) => {
//   const setActionMessage = useMessage((state) => state.setActionMessage);

//   return (
//     <Menubar className='p-1 opacity-0 group-hover:opacity-100'>
//       <TooltipProvider delayDuration={0}>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Button className='p-2' variant={'link'} aria-label='edit message'>
//               <Pencil className='size-4 text-neutral-200' />
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Edit</p>
//           </TooltipContent>
//         </Tooltip>
//         <Separator orientation='vertical' decorative />
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Button
//               onClick={() => {
//                 document.getElementById('trigger-delete')?.click();
//                 setActionMessage(message);
//               }}
//               className='p-2'
//               variant={'link'}
//               aria-label=''
//             >
//               <Trash className='size-4 text-neutral-200' />
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Delete</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     </Menubar>
//   );
// };
