import React, { createContext, ReactNode, useContext, useState } from 'react';

interface DialogContextProps {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return <DialogContext.Provider value={{ open, openDialog, closeDialog }}>{children}</DialogContext.Provider>;
};
