import React, { ReactNode } from 'react';

export type ImageDialogProps = {
  children: ReactNode;
  imgSrc: string;
  onConfirm: () => void;
  sx?: { [key: string]: string };
};
export default function ImageDialog() {
  return <></>;
}
