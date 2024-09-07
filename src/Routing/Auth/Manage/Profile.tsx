'use client';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { mutate } from 'swr';
import DynamicForm from '../../../Form/DynamicForm';
import { Separator } from '../../../components/ui/separator';

export const Profile = ({
  isLoading,
  error,
  data,
  router,
  authConfig,
  userDataSWRKey,
  responseMessage,
  userUpdateEndpoint,
  setResponseMessage,
}: {
  isLoading: boolean;
  error: any;
  data: any;
  router: any;
  authConfig: any;
  userDataSWRKey: string;
  responseMessage: string;
  userUpdateEndpoint: string;
  setResponseMessage: (message: string) => void;
}) => {
  return (
    <div>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>Apply basic changes to your profile</p>
      </div>
      <Separator className='my-4' />
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
    </div>
  );
};
