import { cn } from '@/lib/utils/helpers';

interface CalloutProps {
  children?: React.ReactNode;
  type?: 'default' | 'warning' | 'danger';
}

export default function Callout({ children, type = 'default', ...props }: CalloutProps) {
  return (
    <div
      className={cn('my-6 flex items-start rounded-md border border-l-4 p-4 bg-gray-100', {
        'border-red-900 bg-red-50': type === 'danger',
        'border-yellow-900 bg-yellow-50': type === 'warning',
        'border-blue-900': type === 'default'
      })}
      {...props}
    >
      <div>{children}</div>
    </div>
  );
}
