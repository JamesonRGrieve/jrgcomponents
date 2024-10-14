'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';

type NavItem = {
  name: string;
  href: string;
};

type NavItemProps = {
  active?: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

type NavProps = {
  navItems: NavItem[];
  mobile?: boolean;
  itemProps?: NavItemProps;
} & React.HTMLAttributes<HTMLDivElement>;

export const Nav = ({ navItems, itemProps, mobile, className, ...props }: NavProps) => {
  const pathname = usePathname();
  const { className: itemClassName, active, ...itemRest } = itemProps || {};

  return (
    <nav
      className={cn(
        'flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6',
        mobile && 'flex',
        className,
      )}
      {...props}
    >
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'transition-colors text-muted-foreground hover:text-foreground',
            itemClassName,
            pathname === item.href && (active ?? 'text-foreground'),
          )}
          {...itemRest}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
