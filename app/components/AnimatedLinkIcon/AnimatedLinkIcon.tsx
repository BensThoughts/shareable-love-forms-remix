import type { LinksFunction } from 'remix';
import animatedLinkIconCss from './animated-link-icon.css';
import React from 'react';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: animatedLinkIconCss,
    }
  ]
}

export default function AnimatedLinkIcon({
  children,
  target = '_blank',
  rel = 'noreferrer noopener',
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className='animated-border' target={target} rel={rel} {...rest}>
      {children}
    </a>
  );
}
