import type { ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <p className="text-primary text-xs ">{children} *</p>;
};

export default ErrorMessage;
