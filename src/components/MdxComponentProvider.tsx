import { JSXElement } from "solid-js";
//@ts-expect-error - No typedef? Check for other packages?
import { MDXProvider } from "solid-mdx";
import { CgExternal } from "solid-icons/cg";

// Custom components
const components = {
  a: (props: { href: string; children: string; newTab?: boolean }) => {
    const isExternal = /^https?:\/\//.test(props.href);
    return isExternal ? (
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
        <CgExternal style={{ display: "inline-block" }} />
      </a>
    ) : (
      <a href={props.href}>{props.children}</a>
    );
  },
};

export function MdxComponentProvider(props: { children: JSXElement }) {
  return <MDXProvider components={components}>{props.children}</MDXProvider>;
}
