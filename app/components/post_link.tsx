import { Link } from "react-router";
import type { PostFrontmatter } from "~/lib/posts";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export default function PostLink({ frontmatter }: { frontmatter: PostFrontmatter }) {
  return (
    <li className="group">
      <div className="text-xs text-neutral-500 font-mono mb-0.5">
        {formatDate(frontmatter.date)}
        <span className="mx-2">•</span>
        <span>{frontmatter.author}</span>
      </div>
      <Link
        to={`/posts/${frontmatter.slug}`}
        className="text-neutral-200 hover:text-white transition-colors duration-150 font-medium"
      >
        {frontmatter.title}
      </Link>
      {frontmatter.excerpt && (
        <p className="text-sm text-neutral-500 mt-0.5 leading-snug">
          {frontmatter.excerpt}
        </p>
      )}
    </li>
  );
}
