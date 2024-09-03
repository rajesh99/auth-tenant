import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils/helpers';
import { Code } from 'bright';
import InlineCode from './InlineCode';
import Callout from './Callout';

Code.lineNumbers = true;

export const mdxComponents = {
  a: ({ children, ...props }) => {
    return (
      <Link className="text-blue-400 underline" {...props} href={props.href || ''}>
        {children}
      </Link>
    );
  },
  Image,
  h1: ({ className, ...props }) => (
    <h1
      className={cn('mt-2 scroll-m-20 text-4xl font-bold tracking-tight', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn('mt-8 scroll-m-20 text-2xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn('mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn('mt-8 scroll-m-20 text-base font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cn('mt-2', className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground', className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn('m-0 border-t p-0 even:bg-muted', className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  pre: Code,
  IC: InlineCode,
  Callout
};
