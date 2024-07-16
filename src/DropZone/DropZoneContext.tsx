import React, { createContext, useContext, useState, useCallback, useEffect, PropsWithChildren, useRef } from 'react';

interface DropZoneContextType {
  isDragActive: boolean;
  setIsDragActive: (isDragActive: boolean) => void;
  onUpload: (files: File[]) => void;
}

const DropZoneContext = createContext<DropZoneContextType | undefined>(undefined);

export const useDropZone = () => {
  const context = useContext(DropZoneContext);
  if (!context) {
    throw new Error('useDropZone must be used within a DropZoneProvider');
  }
  return context;
};

interface DropZoneProviderProps {
  onUpload: (files: File[]) => void;
  [key: string]: any;
}

const preventDefault = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

export const DropZoneProvider: React.FC<PropsWithChildren<DropZoneProviderProps>> = ({ onUpload, children }) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const dragCounter = useRef(0);

  const handleDragIn = useCallback((e: DragEvent) => {
    preventDefault(e);
    dragCounter.current++;
    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e: DragEvent) => {
    preventDefault(e);
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragActive(false);
    }

    if ((e.target as HTMLElement).tagName === 'HTML') {
      dragCounter.current = 0;
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      preventDefault(e);
      dragCounter.current = 0;
      setIsDragActive(false);
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        onUpload(Array.from(e.dataTransfer.files));
        e.dataTransfer.clearData();
      }
    },
    [onUpload],
  );

  useEffect(() => {
    const addListener = document.body.addEventListener;
    addListener('dragenter', handleDragIn);
    addListener('dragleave', handleDragOut);
    addListener('dragover', preventDefault);
    addListener('drop', handleDrop);

    return () => {
      const removeListener = document.body.removeEventListener;
      removeListener('dragenter', handleDragIn);
      removeListener('dragleave', handleDragOut);
      removeListener('dragover', preventDefault);
      removeListener('drop', handleDrop);
    };
  }, [handleDragIn, handleDragOut, handleDrop]);

  return <DropZoneContext.Provider value={{ isDragActive, setIsDragActive, onUpload }}>{children}</DropZoneContext.Provider>;
};
