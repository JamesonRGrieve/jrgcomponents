'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import React, { FormEvent, ReactNode, useState } from 'react';
import useSWR, { mutate } from 'swr';
import DynamicForm, { DynamicFormFieldValueTypes } from '../../Form/DynamicForm';
import { useRouter } from 'next/navigation';

export default function Manage(): ReactNode {
  const [responseMessage, setResponseMessage] = useState('');
  type User = {
    missing_requirements?: {
      [key: string]: {
        type: 'number' | 'boolean' | 'text' | 'password';
        value: DynamicFormFieldValueTypes;
        validation?: (value: DynamicFormFieldValueTypes) => boolean;
      };
    };
  };
  const router = useRouter();
  const { data, error, isLoading } = useSWR<User, any, '/user'>('/user', async () => {
    return (
      await axios.get(`${process.env.NEXT_PUBLIC_AGIXT_SERVER}/v1/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('jwt'),
        },
        validateStatus: (status) => [200, 403].includes(status),
      })
    ).data;
  });
  return isLoading ? (
    <Typography>Loading Current Data...</Typography>
  ) : error ? (
    <Typography>{error.message}</Typography>
  ) : (data.missing_requirements && Object.keys(data.missing_requirements).length === 0) || !data.missing_requirements ? (
    <DynamicForm
      toUpdate={data}
      submitButtonText='Update'
      excludeFields={['missing_requirements', 'email']}
      additionalButtons={[
        <Button
          key='done'
          sx={{ gridColumn: 'span 2' }}
          onClick={() => {
            router.push('/');
          }}
        >
          Go to {process.env.NEXT_PUBLIC_APP_NAME}
        </Button>,
      ]}
      onConfirm={async (data) => {
        console.log(data);
        const updateResponse = (
          await axios
            .put(
              `${process.env.NEXT_PUBLIC_AGIXT_SERVER}/v1/user`,
              {
                ...data,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: getCookie('jwt'),
                },
              },
            )
            .catch((exception: any) => exception.response)
        ).data;
        console.log(updateResponse);
        setResponseMessage(updateResponse.detail.toString());
        await mutate('/user');
      }}
    />
  ) : (
    <>
      <DynamicForm
        submitButtonText='Submit Missing Information'
        fields={Object.entries(data.missing_requirements).reduce((acc, [key, value]) => {
          // @ts-expect-error This is a valid assignment.
          acc[key] = { type: value };
          return acc;
        }, {})}
        onConfirm={async (data) => {
          console.log(data);
          const updateResponse = (
            await axios
              .put(
                `${process.env.NEXT_PUBLIC_AGIXT_SERVER}/v1/user`,
                {
                  ...data,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: getCookie('jwt'),
                  },
                },
              )
              .catch((exception: any) => exception.response)
          ).data;
          if (updateResponse.detail) {
            setResponseMessage(updateResponse.detail.toString());
          }
          await mutate('/user');
          if (data.missing_requirements && Object.keys(data.missing_requirements).length === 0) {
            const redirect = getCookie('href') ?? '/';
            deleteCookie('href');
            router.push(redirect);
          }
        }}
      />
      {responseMessage && <Typography>{responseMessage}</Typography>}
    </>
  );
}
