import React from 'react';

export default function FlexSection({
  children,
  className = '',
}: React.HTMLAttributes<HTMLHtmlElement>) {
  return (
    <section className={`flex flex-col gap-6 items-center w-full ${className}`}>
      {children}
    </section>
  );
}
