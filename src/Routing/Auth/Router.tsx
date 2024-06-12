// Use in ./app/user/[[...slug]]/page.tsx
import React from 'react';
import User from './User';
import Login from './Login';
import Manage from './Manage';
import Register from './Register';
import { notFound } from 'next/navigation';
export default function AuthRouter({ params, searchParams }: { params: { slug?: string[] }; searchParams: any }) {
  const { slug } = params;
  const pages = {
    login: <Login searchParams={searchParams} />,
    manage: <Manage />,
    register: <Register services={{}} />,
  };
  if (!slug) return <User />;
  else {
    if (slug[0] in pages) return pages[slug[0] as keyof typeof pages];
    else return notFound();
  }
}
