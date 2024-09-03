import Link from 'next/link';
import Image from 'next/image';

export default function PostPreview({ post }) {
  return (
    <div key={post.meta.id}>
      <article key={post.meta.id} className="group relative flex flex-col space-y-2">
        <Image
          alt={post.meta.title}
          src={post.meta.image}
          width={384}
          height={224}
          className="rounded-md border bg-muted transition-colors w-full h-56"
        />

        <h2 className="font-heading text-2xl">{post.meta.title}</h2>

        <p className="text-muted-foreground">{post.meta.description}</p>

        <div className="flex space-x-2">
          <p className="text-sm text-muted-foreground">{post.meta.date}</p>
          <div className="text-sm">|</div>
          <p className="text-sm text-muted-foreground">{post.meta.read_time} read</p>
        </div>

        <Link href={`/blog/${post.slug}`} className="absolute inset-0">
          <span className="sr-only">View Article</span>
        </Link>
      </article>
    </div>
  );
}
