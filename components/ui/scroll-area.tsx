//I extracted all the individual components so that you can
//style each one at its level

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    {children}
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export const ScrollViewport = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaViewport>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaViewport>
>(({ className, children }, ref) => (
  <ScrollAreaPrimitive.Viewport
    ref={ref}
    className={cn('h-full w-full rounded-[inherit]', className)}
  >
    {children}
  </ScrollAreaPrimitive.Viewport>
));
ScrollViewport.displayName = ScrollAreaPrimitive.ScrollAreaViewport.displayName;

export const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, children, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      className,
    )}
    {...props}
  >
    {children}
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export const ScrollThumb = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaThumb>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaThumb>
>(({className}, ref) => (
  <ScrollAreaPrimitive.ScrollAreaThumb
    ref={ref}
    className={cn('relative flex-1 rounded-full bg-border', className)}
  />
));
ScrollThumb.displayName = ScrollAreaPrimitive.ScrollAreaThumb.displayName;

export const ScrollCorner = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaCorner>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaCorner>
>((className, ref) => (
  <ScrollAreaPrimitive.ScrollAreaCorner ref={ref} className={cn('', className)} />
));
ScrollCorner.displayName = ScrollAreaPrimitive.ScrollAreaCorner.displayName;
