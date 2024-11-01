'use client';
import { FormEvent } from 'react';
import { Separator } from '../../../components/ui/separator';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import TextField from '../../../MUI/Styled/Input/TextField';

export const Invitations = ({
  authConfig,
  data,
  userInvitationEndpoint: userPasswordChangeEndpoint = '/v1/invitations',
  setResponseMessage,
}: {
  authConfig: any;
  data: any;
  userInvitationEndpoint?: string;
  setResponseMessage: (message: string) => void;
}) => {
  return (
    <div>
      <div>
        <h3 className='text-lg font-medium'>Invitations</h3>
        <p className='text-sm text-muted-foreground'>Invite a user</p>
      </div>
      <Separator className='my-4' />
      <form
        onSubmit={async (event: FormEvent<HTMLFormElement>): Promise<void> => {
          const formData = Object.fromEntries(new FormData((event.currentTarget as HTMLFormElement) ?? undefined));

          if (!formData['invitee']) setResponseMessage('Please enter an email to invite.');
          const inviteResponse = await axios
            .post(
              `${authConfig.authServer}${userPasswordChangeEndpoint}`,
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
            .catch((exception: any) => exception.response);
          if (inviteResponse.data.detail) {
            setResponseMessage(inviteResponse.data.detail.toString());
          }
          if (inviteResponse.status === 200) {
            setResponseMessage('Invited!');
          }
        }}
      >
        <TextField id='invitee' name='invitee' label='E-Mail Address to Invite' />
      </form>
    </div>
  );
};
