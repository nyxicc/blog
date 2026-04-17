import type { MetaFunction } from "react-router";
import { getAllPosts } from "~/lib/posts";
import PostLink from "~/components/post_link";

export const meta: MetaFunction = () => [
  { title: "nyxicc • blog" },
  { name: "description", content: "nyxicc's personal blog" },
];

const ASCII_HEADER = `
 ███╗   ██╗██╗   ██╗██╗  ██╗██╗ ██████╗ ██████╗
 ████╗  ██║╚██╗ ██╔╝╚██╗██╔╝██║██╔════╝██╔════╝
 ██╔██╗ ██║ ╚████╔╝  ╚███╔╝ ██║██║     ██║
 ██║╚██╗██║  ╚██╔╝   ██╔██╗ ██║██║     ██║
 ██║ ╚████║   ██║   ██╔╝ ██╗██║╚██████╗╚██████╗
 ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═════╝
`.trim();

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="w-full max-w-2xl">
      {/* ASCII header — desktop only */}
      <pre
        aria-hidden="true"
        className="hidden md:block font-mono text-[0.6rem] leading-tight text-neutral-300 mb-6 select-none overflow-x-auto"
      >
        {ASCII_HEADER}
      </pre>

      {/* Mobile title */}
      <p className="md:hidden font-mono text-lg font-bold text-neutral-200 mb-4">
        nyxicc
      </p>

      {/* Nav */}
      <div className="flex items-center gap-4 font-mono text-sm text-neutral-400 mb-6">
        <a
          href="https://github.com/nyxicc"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          github
        </a>
        <span className="text-neutral-700">•</span>
        <a
          href="https://twitter.com/nyxicc"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          twitter
        </a>
        <span className="text-neutral-700">•</span>
        <a
          href="/rss.xml"
          className="hover:text-white transition-colors"
        >
          rss
        </a>
      </div>

      <hr className="border-neutral-800 mb-8" />

      {/* Post list */}
      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post) => (
            <PostLink key={post.frontmatter.slug} frontmatter={post.frontmatter} />
          ))}
        </ul>
      ) : (
        <p className="font-mono text-sm text-neutral-600">no posts yet.</p>
      )}

      <hr className="border-neutral-800 mt-12 mb-6" />

      {/* Footer */}
      <footer className="font-mono text-xs text-neutral-600">
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-400 transition-colors"
        >
          cc by-sa 4.0
        </a>
      </footer>
    </div>
  );
}
