import { useRef } from "react";
import { useParams, Link } from "react-router";
import { MDXProvider } from "@mdx-js/react";
import { getPostBySlug } from "~/lib/posts";
import type { MetaFunction } from "react-router";
import TypewriterArticle from "~/components/typewriter_article";
import HashTitle from "~/components/HashTitle";
import TableOfContents from "~/components/TableOfContents";

export const meta: MetaFunction = () => [{ title: "nyxicc • blog" }];

export default function Post() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : null;
  const articleRef = useRef<HTMLElement>(null);

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
    <div className="w-full max-w-5xl flex gap-12">
      {/* Sidebar TOC */}
      <TableOfContents articleRef={articleRef} title={frontmatter.title} />

      {/* Main content */}
      <div className="flex-1 min-w-0 max-w-2xl">
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

        <h1 className="text-xl md:text-2xl font-bold text-white mb-8">
          <HashTitle text={frontmatter.title} />
        </h1>

        <MDXProvider>
          <TypewriterArticle
            ref={articleRef}
            className="prose prose-invert prose-neutral max-w-none prose-headings:font-mono prose-code:font-mono"
          >
            <Component />
          </TypewriterArticle>
        </MDXProvider>
      </div>
    </div>
  );
}
