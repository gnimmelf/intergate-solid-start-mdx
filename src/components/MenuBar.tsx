import { createSignal } from "solid-js";
import { clientOnly } from "@solidjs/start";
import { useBeforeLeave } from "@solidjs/router";
import { css, cx } from "styled-system/css";
import { center } from "styled-system/patterns";
import { useTheme } from "./ThemeProvider";
import { usePageData } from "./PageDataContext";
import { CgDarkMode } from "solid-icons/cg";
import { PRIMARY_MENU_LINKS, SITE_TITLE } from "~/constants";
import { link } from "styled-system/recipes/link";
import { linkScope } from "styled-system/recipes";

const LINK_AREA = 'menu'

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
  ),
  siteTitle: cx(
    center(),
    css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      "& *": {
        margin: "0px",
      },
    }),
    linkScope({ area: LINK_AREA })
  ),
  menuButton: cx(
    center(),
    css({
      width: "40px",
      height: "40px",
      border: "none",
      fontSize: "1.5rem",
    }),
    link({ area: LINK_AREA })
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
    theme.toggleTheme();
  }

  return (
    <>
      <div
        class={cx(
          styles.menuBar,
          !menuIsOpen() &&
            /**
             * This filter interferes with the backdrop blur on menu open
             * - So reverse toggle filter for when menu is open
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

        <div class={styles.siteTitle}>
          <a href="/">
            <h2>{SITE_TITLE}</h2>
          </a>
          <div>{theme.currentTheme()}</div>
        </div>

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
