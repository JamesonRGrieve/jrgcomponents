import { Menu } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import { cn } from '../../lib/utils';

type MobileSideBarProps = React.HTMLAttributes<HTMLDivElement> & {
  side?: 'top' | 'bottom' | 'left' | 'right' | null | undefined;
};

export const MobileSideBar = ({ className, children, side = 'left', ...props }: MobileSideBarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='bg-transparent rounded-lg shrink-0 md:hidden'>
          <Menu className='w-5 h-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className={cn('flex flex-col gap-6', className)} {...props}>
        {children}
      </SheetContent>
    </Sheet>
  );
};
