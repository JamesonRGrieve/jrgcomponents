import React, { useState, useCallback, useRef, ReactNode } from 'react';
import { Box, Button, SxProps, Theme } from '@mui/material';

interface DropZoneProps {
  children: ReactNode;
  onUpload: (files: File[]) => void;
  sx?: SxProps<Theme>;
  hoverSx?: SxProps<Theme>;
}

interface ManualUploadProps {
  onUpload: (files: File[]) => void;
  children: ReactNode;
  [key: string]: any; // For additional props
}

interface DeadZoneProps {
  children: ReactNode;
  [key: string]: any; // For additional props
}

const DropZone: React.FC<DropZoneProps> & {
  ManualUpload: React.FC<ManualUploadProps>;
  DeadZone: React.FC<DeadZoneProps>;
} = ({ children, onUpload, sx, hoverSx }) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        onUpload(Array.from(e.dataTransfer.files));
        e.dataTransfer.clearData();
      }
    },
    [onUpload],
  );

  React.useEffect(() => {
    const div = dropRef.current;
    if (div) {
      div.addEventListener('dragenter', handleDragIn);
      div.addEventListener('dragleave', handleDragOut);
      div.addEventListener('dragover', handleDrag);
      div.addEventListener('drop', handleDrop);
      return () => {
        div.removeEventListener('dragenter', handleDragIn);
        div.removeEventListener('dragleave', handleDragOut);
        div.removeEventListener('dragover', handleDrag);
        div.removeEventListener('drop', handleDrop);
      };
    }
  }, [handleDrag, handleDragIn, handleDragOut, handleDrop]);

  return (
    <Box
      ref={dropRef}
      sx={{
        border: '2px dashed #ccc',
        borderRadius: 2,
        p: 2,
        cursor: 'pointer',
        ...(sx as any),
        ...(isDragActive ? (hoverSx as any) : {}),
      }}
    >
      {children}
    </Box>
  );
};

const ManualUpload: React.FC<ManualUploadProps> = ({ onUpload, children, ...props }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        onUpload(Array.from(target.files));
      }
    };
    input.click();
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

const DeadZone: React.FC<DeadZoneProps> = ({ children, ...props }) => {
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Box onDragOver={handleDragOver} {...props}>
      {children}
    </Box>
  );
};

DropZone.ManualUpload = ManualUpload;
DropZone.DeadZone = DeadZone;

DropZone.displayName = 'DropZone';
ManualUpload.displayName = 'DropZone.ManualUpload';
DeadZone.displayName = 'DropZone.DeadZone';

export default DropZone;
