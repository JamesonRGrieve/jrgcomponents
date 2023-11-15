import Link from 'next/link';
import {
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
export default function MenuList({ pages }: { pages: any }) {
  const router = useRouter();
  return (
    <List>
      {pages.map(
        ({ name, href, Icon }: { name: any; href: any; Icon: any }) => (
          <ListItemButton
            key={name}
            selected={router.pathname.split('/')[1] == href}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <Link href={`/${href}`}>
              <ListItemText primary={name} />
            </Link>
          </ListItemButton>
        )
      )}
    </List>
  );
}
