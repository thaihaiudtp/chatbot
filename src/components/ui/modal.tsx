import { ReactNode } from 'react';
import { Dialog as HeadlessDialog, DialogPanel } from '@headlessui/react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <HeadlessDialog open={open} onClose={() => onOpenChange(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-96 max-w-md rounded-lg bg-gray-200 p-6 shadow-lg text-gray-700">
          {children}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
}

export function DialogContent({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return <div className="flex justify-end space-x-2">{children}</div>;
}
