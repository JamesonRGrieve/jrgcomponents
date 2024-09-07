'use client';
import { Separator } from '../../../components/ui/separator';
import SwitchDark from '../../../Theming/SwitchDark';
import SwitchColorblind from '../../../Theming/SwitchColorblind';

export const Appearance = () => {
  return (
    <div>
      <div>
        <h3 className='text-lg font-medium'>Appearance</h3>
        <p className='text-sm text-muted-foreground'>
          Customize the interface. Switch between light and dark mode as well as colorblind mode
        </p>
      </div>
      <Separator className='my-4' />
      <SwitchDark />
      <SwitchColorblind />
    </div>
  );
};
