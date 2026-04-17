import { useParams, Link } from "react-router";
import { MDXProvider } from "@mdx-js/react";
import { getPostBySlug } from "~/lib/posts";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [{ title: "nyxicc • blog" }];

export default function Post() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="w-full max-w-2xl">
        <Link
          to="/"
          className="font-mono text-sm text-neutral-500 hover:text-white transition-colors"
        >
          ← home
        </Link>
        <p className="mt-8 text-neutral-500 font-mono text-sm">post not found.</p>
      </div>
    );
  }

  const { frontmatter, Component } = post;

  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <div className="w-full max-w-2xl">
      <Link
        to="/"
        className="font-mono text-sm text-neutral-500 hover:text-white transition-colors"
      >
        ← home
      </Link>

      <div className="mt-8 mb-2 font-mono text-xs text-neutral-500">
        {date}
        <span className="mx-2">•</span>
        {frontmatter.author}
      </div>

      <h1 className="text-2xl font-bold text-white mb-8 md:text-gradient-animated">
        {frontmatter.title}
      </h1>

      <MDXProvider>
        <article className="prose prose-invert prose-neutral max-w-none prose-headings:font-mono prose-code:font-mono">
          <Component />
        </article>
      </MDXProvider>
    </div>
  );
}
