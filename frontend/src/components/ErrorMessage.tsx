import type { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode,
  className?: string
}

const ErrorMessage = ({ children , className}: ErrorMessageProps) => {
  return <p className={`text-primary text-xs ${className}`}>{children} *</p>;
};

export default ErrorMessage;