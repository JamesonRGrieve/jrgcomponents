import React, { ReactNode } from 'react';

export type DialogProps = {
  children: ReactNode;
  onCancel: () => void;
  onConfirm?: () => void;
  sx?: { [key: string]: string };
};
export default function Dialog({ onSubmit, onCancel, children }: DialogProps) {
  return <></>;
}
