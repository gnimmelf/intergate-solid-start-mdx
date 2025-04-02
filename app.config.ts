import { defineConfig } from "@solidjs/start/config";
/* @ts-ignore */
import pkgMdx from "@vinxi/plugin-mdx";
import remarkBehead from 'remark-behead';
import remarkParseFrontmatter from './scripts/remarkParseFrontmatter';

const { default: mdx } = pkgMdx;
export default defineConfig({
  extensions: ["mdx", "md"],
  vite: {
    resolve: {
      alias: {
        // Panda-css: Must match ts-config::compilerOptions::paths
        "styled-system": "/styled-system",
      },
    },
    css: {
      postcss: './postcss.config.cjs',
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


