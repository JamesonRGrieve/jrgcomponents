'use client';

import { CircleUser } from 'lucide-react';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useTheme } from '../../Theming/useTheme';

import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { cn } from '../../lib/utils';

type MenuItem = {
  name: string;
  href: string;
};

type UserMenuGroups = MenuItem[][];

export const UserMenu = ({ userMenuItems }: { userMenuItems: UserMenuGroups }) => {
  return (
    <div className='flex items-center gap-4 md:gap-2 lg:gap-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon' className='bg-transparent rounded-full'>
            <CircleUser className='w-5 h-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {userMenuItems.map((items, index) => (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup key={index}>
                {items.map((item) => (
                  <DropdownMenuItem key={item.name}>
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </>
          ))}
          <DropdownMenuSeparator />
          <Appearance />
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(event) => {
              event.preventDefault();
              deleteCookie('jwt');
              document.location = '/';
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Appearance = () => {
  const { themes, currentTheme, setTheme } = useTheme();
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Appearance</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme}
              className={cn('capitalize', theme === currentTheme && 'bg-muted')}
              onClick={() => setTheme(theme)}
            >
              {theme}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};
