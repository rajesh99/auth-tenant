import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { mdxComponents } from '../_PageSections/MdxComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { Icons } from '@/components/Icons';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { buttonVariants } from '@/components/ui/Button';
import Image from 'next/image';

interface UrlParamsI {
  params: { slug: string };
}

interface GetPostI {
  slug: string;
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', '')
  }));

  return paths;
}

export async function generateMetadata({ params }: UrlParamsI) {
  const blog = getPost(params);

  return {
    title: blog.frontMatter.title,
    description: blog.frontMatter.description
  };
}

function getPost({ slug }: GetPostI) {
  const markdownFile = fs.readFileSync(path.join('posts', slug + '.mdx'), 'utf-8');

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content
  };
}

export default function Post({ params }: UrlParamsI) {
  const post = getPost(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="container justify-self-center relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-[-200px] top-14 hidden xl:inline-flex'
        )}
      >
        <Icons.ChevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        <div className="flex justify-between">
          <time dateTime={post.frontMatter.date} className="block text-sm text-muted-foreground">
            Published on {post.frontMatter.date}
          </time>
          <div>{post.frontMatter.read_time}</div>
        </div>

        <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
          {post.frontMatter.title}
        </h1>
      </div>
      <Image
        src={post.frontMatter.image}
        alt={post.frontMatter.title}
        width={720}
        height={405}
        className="my-8 rounded-md border bg-muted transition-colors w-full"
        priority
      />

      <MDXRemote
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
          }
        }}
        components={mdxComponents}
        source={post.content}
      />

      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: 'ghost' }))}>
          <Icons.ChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  );
}
