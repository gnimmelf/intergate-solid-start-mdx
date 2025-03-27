import { defineConfig } from "@solidjs/start/config";
/* @ts-ignore */
import pkgMdx from "@vinxi/plugin-mdx";
import remarkBehead from 'remark-behead';
import remarkParseFrontmatter from './scripts/remarkParseFrontmatter';

const { default: mdx } = pkgMdx;
export default defineConfig({
  extensions: ["mdx", "md"],
  vite: {
    css: {
      postcss: './postcss.config.ts',
    },
    plugins: [
      mdx.withImports({
        // Skip React default imports
      })({
        remarkPlugins: [
          [remarkBehead, {minDepth: 2}],
          [remarkParseFrontmatter, {dataKey: 'meta'}],
        ],
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx"
      }),
    ]
  }
});


