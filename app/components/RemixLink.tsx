import React from 'react';
import { Link } from 'remix';

type RemixLinkProps = {
  to: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function RemixLink({
  to,
  className,
  children,
  ...rest
}: RemixLinkProps) {
  return (
    <Link
      to={to}
      className={`outline-none
      focus-visible:border-opacity-80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-80
      focus-visible:ring-offset-1 focus-visible:ring-offset-primary/[.15]
      hover:border-opacity-80 hover:ring-2 hover:ring-primary hover:ring-opacity-80
      hover:ring-offset-1 hover:ring-offset-primary/[.15]
      ${className ? className : ''}`}
      {...rest}
    >
      {children}
    </Link>
  )
}

