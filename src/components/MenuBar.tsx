import { createSignal } from "solid-js";
import { clientOnly } from "@solidjs/start";
import { useBeforeLeave } from "@solidjs/router";
import { css, cx } from "styled-system/css";
import { center } from "styled-system/patterns";
import { useTheme } from "./ThemeProvider";
import { usePageData } from "./PageDataContext";
import { CgDarkMode } from "solid-icons/cg";
import { PRIMARY_MENU_LINKS, SITE_TITLE } from "~/constants";
import { linkScope } from "styled-system/recipes";
import { link } from "styled-system/recipes/link";

// The BlobMenu - Uses screen width to disperse menu blob items
const BlobMenu = clientOnly(() => import("./BlobMenu"));

const styles = {
  menuBar: cx(
    css({
      padding: "2px",
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid {colors.background}",
    })
    // linkScope({ area: "page", cursor: "disabled" }),
  ),
  siteTitle: cx(
    css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      "& > *": {
        margin: "0px",
      },
    }),
    link()
  ),
  menuButton: cx(
    center(),
    css({
      width: "40px",
      height: "40px",
      border: "none",
      fontSize: "1.5rem",
    }),
    link()
  ),
};

export function MenuBar() {
  const theme = useTheme();
  const pageData = usePageData();

  const [menuToggleRef, setMenuToggleRef] = createSignal<HTMLElement | null>(
    null
  );
  const [menuIsOpen, setMenuIsOpen] = createSignal(false);

  useBeforeLeave(() => {
    setMenuIsOpen(false);
  });

  function toggleDarkMode() {
    theme.toggleIsDark();
    document.documentElement.setAttribute(
      "data-theme",
      theme.isDark() ? "dark" : ""
    );
  }

  return (
    <>
      <div
        class={cx(
          styles.menuBar,
          !menuIsOpen() &&
            /**
             * This filter interferes with the backdrop blur on menu open
             * - So reverse toggle for when menu is open
             */
            css({
              backdropFilter: "auto",
              backdropBlur: "sm",
            })
        )}
      >
        <button
          ref={setMenuToggleRef}
          class={styles.menuButton}
          style={{ "z-index": 10, "pointer-events": "auto" }}
          onClick={() => {
            setMenuIsOpen(!menuIsOpen());
          }}
          aria-label={menuIsOpen() ? "Close menu" : "Open menu"}
        >
          ☰
        </button>

        <div style={{ position: "absolute" }}>
          <BlobMenu
            zIndex={9}
            links={PRIMARY_MENU_LINKS}
            isOpen={menuIsOpen}
            setIsOpen={setMenuIsOpen}
            menuToggleRef={menuToggleRef}
          />
        </div>

        <a class={styles.siteTitle} href="/">
          <h2>{SITE_TITLE}</h2>
        </a>

        <button
          class={styles.menuButton}
          style={{ "z-index": 8 }}
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <CgDarkMode size={26} />
        </button>
      </div>
    </>
  );
}
