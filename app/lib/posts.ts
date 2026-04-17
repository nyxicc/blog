export interface PostFrontmatter {
  title: string;
  date: string;
  slug: string;
  author: string;
  excerpt: string;
  keywords?: string[];
}

export interface Post {
  frontmatter: PostFrontmatter;
}

const modules = import.meta.glob<{
  frontmatter: PostFrontmatter;
  default: React.ComponentType;
}>("../posts/**/*.mdx", { eager: true });

export function getAllPosts(): Post[] {
  return Object.values(modules)
    .filter((mod) => mod.frontmatter)
    .map((mod) => ({ frontmatter: mod.frontmatter }))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(slug: string): {
  frontmatter: PostFrontmatter;
  Component: React.ComponentType;
} | null {
  for (const mod of Object.values(modules)) {
    if (mod.frontmatter?.slug === slug) {
      return { frontmatter: mod.frontmatter, Component: mod.default };
    }
  }
  return null;
}
