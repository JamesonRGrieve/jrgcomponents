'use client';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import React, { ReactNode, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import DynamicForm, { DynamicFormFieldValueTypes } from '../../Form/DynamicForm';
import { useAuthentication } from './Router';

export type ManageProps = { userDataSWRKey?: string; userDataEndpoint?: string; userUpdateEndpoint?: string };
export default function Manage({
  userDataSWRKey = '/user',
  userDataEndpoint = '/v1/user',
  userUpdateEndpoint = '/v1/user',
}: ManageProps): ReactNode {
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
  const authConfig = useAuthentication();
  const { data, error, isLoading } = useSWR<User, any, string>(userDataSWRKey, async () => {
    return (
      await axios.get(`${authConfig.authServer}${userDataEndpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('jwt'),
        },
        validateStatus: (status) => [200, 403].includes(status),
      })
    ).data;
  });
  return (
    <>
      {authConfig.manage.heading && <Typography variant='h2'>{authConfig.manage.heading}</Typography>}
      {isLoading ? (
        <Typography>Loading Current Data...</Typography>
      ) : error ? (
        <Typography>{error.message}</Typography>
      ) : (data.missing_requirements && Object.keys(data.missing_requirements).length === 0) ||
        !data.missing_requirements ? (
        <DynamicForm
          toUpdate={data}
          submitButtonText='Update'
          excludeFields={['missing_requirements', 'email', 'subscription', 'ip_address']}
          readOnlyFields={['input_tokens', 'output_tokens']}
          additionalButtons={[
            <Button
              key='done'
              sx={{ gridColumn: 'span 2' }}
              onClick={() => {
                router.push('/');
              }}
            >
              Go to {authConfig.appName}
            </Button>,
          ]}
          onConfirm={async (data) => {
            console.log(data);

            const updateResponse = (
              await axios
                .put(
                  `${authConfig.authServer}${userUpdateEndpoint}`,
                  {
                    ...Object.entries(data).reduce((acc, [key, value]) => {
                      return value ? { ...acc, [key]: value } : acc;
                    }, {}),
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
              acc[Object.keys(value)[0]] = { type: Object.values(value)[0] };
              return acc;
            }, {})}
            onConfirm={async (data) => {
              console.log(data);
              const updateResponse = (
                await axios
                  .put(
                    `${authConfig.authServer}${userUpdateEndpoint}`,
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
              await mutate(userDataSWRKey);
              if (data.missing_requirements && Object.keys(data.missing_requirements).length === 0) {
                const redirect = getCookie('href') ?? '/';
                deleteCookie('href');
                router.push(redirect);
              }
            }}
          />
          {responseMessage && <Typography>{responseMessage}</Typography>}
        </>
      )}
    </>
  );
}
