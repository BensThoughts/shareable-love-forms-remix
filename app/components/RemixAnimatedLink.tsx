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
      className={`rounded-sm outline-none bg-gradient-to-r from-primary to-primary bg-growing-underline
                  focus-visible:border-opacity-80 focus-visible:ring-2 focus-visible:ring-primary
                  focus-visible:ring-opacity-80 focus-visible:ring-offset-4 focus-visible:ring-offset-app-bg
                  ${className}`}
    >
        {children}
    </Link>
  )
}
