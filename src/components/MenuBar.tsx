import { createMemo, createSignal } from "solid-js";
import { usePageData } from "./PageDataContext";
import { css, cx } from "styled-system/css";
import { center } from "styled-system/patterns";
import { useTheme } from "./ThemeProvider";
import { getRoutesPageData } from "~/utils/getRoutesPageData";
import { CgDarkMode } from "solid-icons/cg";
import { BlobMenu } from "./BlobMenu";
import { Portal } from "solid-js/web";

const styles = {
  menuBar: css({
    display: "flex",
    justifyContent: "space-between",
  }),
  menuButton: cx(
    center(),
    css({
      width: "50px",
      height: "50px",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
    })
  ),
};

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Test article 01",
    href: "/blog/test01",
  },
  {
    label: "Test article 02",
    href: "/blog/test02",
  },
  {
    label: "Test article 03",
    href: "/blog/test03",
  },
];

export function MenuBar() {
  const theme = useTheme();
  const pageData = usePageData();
  const articles = getRoutesPageData("/");

  const [menuIsOpen, setMenuIsOpen] = createSignal(false);

  const categories = createMemo(() =>
    Object.entries(
      articles()?.reduce((acc, a) => {
        const parts = a.path.split("/").filter((p) => p);
        if (parts.length == 2) {
          const link = {
            label: a.meta.title,
            href: a.path,
          };
          acc[parts[0]] ? acc[parts[0]].push(link) : (acc[parts[0]] = [link]);
        }
        return acc;
      }, {} as Record<string, Array<{ label: string; href: string }>>) || []
    ).map(([key, links]) => ({ key, links }))
  );

  const isFrontPage = createMemo(() => pageData()?.path === "/");

  function toggleDarkMode() {
    theme.toggleIsDark();
    document.documentElement.setAttribute(
      "data-theme",
      theme.isDark() ? "dark" : ""
    );
  }

  return (
    <div class={styles.menuBar}>
      <button
        class={styles.menuButton}
        onClick={() => setMenuIsOpen(!menuIsOpen())}
        aria-label={menuIsOpen() ? "Close menu" : "Open menu"}
      >
        ☰
      </button>
      <BlobMenu links={menuLinks} isOpen={menuIsOpen} />

      <button onClick={toggleDarkMode} class={styles.menuButton}>
        <CgDarkMode size={26} />
      </button>
    </div>
  );
}
