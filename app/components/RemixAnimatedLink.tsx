import { Link } from 'remix';

export default function RemixAnimatedLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: string;
}) {
  return (
    <Link
      to={to}
      prefetch="intent"
      className={`rounded-sm outline-none animated-underline
                  focus-visible:border-opacity-80 focus-visible:ring-2 focus-visible:ring-primary
                  focus-visible:ring-opacity-80 focus-visible:ring-offset-4 focus-visible:ring-offset-app-bg
                  ${className}`}
    >
        {children}
    </Link>
  )
}
