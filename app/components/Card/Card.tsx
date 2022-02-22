type TitleCardProps = {
  header?: React.ReactChild;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>

function Header({ className, children }: {className?: string, children: React.ReactNode}) {
  return (
    <div className={`flex items-center py-4 px-4 rounded-t sm:px-8 sm:py-6 ${className}`}>{children}</div>
  );
}

const Card = ({
  header = undefined,
  footer = undefined,
  title,
  description,
  className,
  children,
}: TitleCardProps) => {
  return (
    <div className={`relative ${className}`}>
      {header && <>{header}</>}
      <div className="py-4 px-2 sm:px-8 sm:pb-8">
        {title && <div className="mb-4 text-2xl font-bold">{title}</div>}
        {description && <div className="text-base text-secondary">{description}</div>}
        {children}
      </div>
      {footer && <>{footer}</>}
    </div>
  );
};

Card.Header = Header;

export default Card;
