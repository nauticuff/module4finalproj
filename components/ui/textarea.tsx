// Okay this component code gets a little F U N K Y, read well.
// I import the npm component AutosizeTextarea as a named import.
// I also import the interface for this imported component.
// I state that the base interface is HTMLTextAreaElement and then
// I extend (or place) TextareaProps over that existing base interface (HTMLTextAreaElement)
// TypeScript then is happy
//bonus: cn just helps merge the base css and incoming css

import * as React from 'react';
import AutosizeTextarea, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaAutosizeProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <AutosizeTextarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
