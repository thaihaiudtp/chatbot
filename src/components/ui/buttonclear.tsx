import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function ButtonClear({ className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
