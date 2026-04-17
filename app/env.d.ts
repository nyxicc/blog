/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";

  export const frontmatter: {
    title: string;
    date: string;
    slug: string;
    author: string;
    excerpt: string;
    keywords?: string[];
  };

  const MDXComponent: (props: MDXProps) => JSX.Element;
  export default MDXComponent;
}

declare module "@mapbox/rehype-prism" {
  import type { Plugin } from "unified";
  const rehypePrism: Plugin;
  export default rehypePrism;
}
