import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostPreview from './_PageSections/PostPreview';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog'
};

export default function Blog() {
  const blogDir = 'posts';
  const files = fs.readdirSync(path.join(blogDir));

  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
    const { data: frontMatter } = matter(fileContent);

    return {
      meta: frontMatter,
      slug: filename.replace('.mdx', '')
    };
  });

  const allPosts = [...posts].sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );

  return (
    <main className="mx-8">
      <h1 className="text-3xl font-extrabold text-center">My Blogging Site</h1>
      <h2 className="text-xl font-bold text-center">
        Tutorials, Guides and Updates for building your SaaS
      </h2>
      <div className="space-y-10 py-6 md:py-10">
        <section>
          <h2 className="text-center md:text-left mb-4 font-heading text-3xl">Featured Posts</h2>
          <div className="grid gap-12 justify-center md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <>
                {post.meta.featured && post.meta.isLive && (
                  <PostPreview key={post.meta.title} post={post} />
                )}
              </>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-center md:text-left mb-4 font-heading text-3xl">Latest Posts</h2>
          <div className="grid gap-12 justify-center md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <>{post.meta.isLive && <PostPreview key={post.meta.title} post={post} />}</>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
