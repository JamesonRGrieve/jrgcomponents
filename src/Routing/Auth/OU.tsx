'use client';
import { ContentCopyOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { FormEvent, ReactNode, useState } from 'react';
import QRCode from 'react-qr-code';
import { useAuthentication } from './Router';
import { validateURI } from '../../utils/Validation';
import { useAssertion } from '../../utils/Assert';
import useSWR from 'swr';
export type OrganizationalUnitProps = {
  organizationalUnitEndpoint?: string;
};
export interface OrganizationalUnit {
  id: number;
  name: string;
  stripe_id: string;
  enabled: boolean;
  properties: Record<string, any>; // This indicates an object with dynamic keys and any values
  subscriptions: any[]; // Assuming subscriptions is an array of any type
  companies: object[];
  quotas: Quotas;
}
export interface Quotas {
  [quotaType: string]: {
    available: number;
    used: number;
  };
}

export default function OrganizationalUnit({
  searchParams,
  organizationalUnitEndpoint = '/ou',
}: { searchParams: any } & OrganizationalUnitProps): ReactNode {
  const authConfig = useAuthentication();
  const router = useRouter();
  const {
    data: ouData,
    error,
    isLoading,
  } = useSWR<OrganizationalUnit[]>(`/ou/${searchParams.ou}`, async () => {
    const response = await axios.get(`${authConfig.authServer}${organizationalUnitEndpoint}`, {
      headers: {
        Authorization: getCookie('jwt'),
      },
    });
    return response.data.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
  });
  return null;
}
