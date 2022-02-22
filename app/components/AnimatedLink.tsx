import { forwardRef, MouseEventHandler } from 'react';

type AProps = {
  children: React.ReactNode;
  // className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const AnimatedLink = forwardRef<HTMLAnchorElement, AProps>(({
  children,
  onClick,
  href,
  className,
  ...rest
}, ref) => {
  return (
    <a
      href={href}
      onClick={onClick}
      ref={ref}
      className={`rounded-sm outline-none animated-underline focus-visible:border-opacity-80 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-opacity-80 focus-visible:ring-offset-4 focus-visible:ring-offset-app-bg ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
});

AnimatedLink.displayName = 'AnimatedLink';

export default AnimatedLink;
