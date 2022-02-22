import React from 'react';

export default function Title({
  className = '',
  children,
}: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element {
  return (
    <h1 className={`text-4xl font-bold ${className}`}>
      {children}
    </h1>
  );
}
