import { ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
export default function MenuList({ items }: { items: (MenuListItem|ReactNode)[] }) {
  return (
    <>
      {items.map((item: MenuListItem|ReactNode, index: number) => (
        item && typeof item === 'object' && 'label' in item ? <MenuItem key={index} item={item} /> : item
      ))}
    </>
  );
}
function MenuItem({ item }: { item: MenuListItem }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <ListItemButton
        onClick={(e: any) => {
          if (item.click) item.click(e);
          if (item.subItems && item.subItems.length > 0) setOpen((old) => !old);
          if (item.href) router.push(item.href);
        }}
        selected={item.selected || pathname.split('/')[1] == item.label}
        sx={{ pl: `${item.indent ? item.indent+1 : 1}rem` }}
      >
        {item.Icon && <ListItemIcon>{item.Icon}</ListItemIcon>}
        <ListItemText primary={item.label} />
        {item.buttons && item.buttons.length>0 && item.buttons.map((button, index) => (
          <ListItemIcon
            key={index}
            onClick={(e: any) => {
              button.href
                ? router.push(button.href)
                : button.click
                  ? button.click(e)
                  : null;
            }}
          >
            {button.Icon}
          </ListItemIcon>
        ))}
      </ListItemButton>
      {open && item.subItems && item.subItems.length > 0 &&
        item.subItems.map((item) => <MenuItem key={item.label} item={item} />)
        }
    </>
  );
}
export type MenuListItem = {
  label: string;
  Icon?: ReactNode;
  tooltip?: string;
  href?: string;
  click?: (e: MouseEvent) => void;
  selected?: boolean;
  indent?: number;
  buttons?: {
    Icon: ReactNode;
    tooltip?: string;
    href?: string;
    click?: (e: MouseEvent) => void;
  }[];
  subItems?: MenuListItem[];
};
