import React, { ButtonHTMLAttributes, ReactNode } from "react";

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}) => {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-full bg-blue-500 text-white shadow"
    >
      {children}
    </button>
  );
};

export default Button;
