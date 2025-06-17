import { createSignal } from "solid-js";
import { clientOnly } from "@solidjs/start";
import { useBeforeLeave } from "@solidjs/router";
import { css, cx } from "styled-system/css";
import { center } from "styled-system/patterns";
import { useTheme } from "./ThemeProvider";
import { usePageData } from "./PageDataContext";
import { PRIMARY_MENU_LINKS, SITE_SUB_TITLE, SITE_TITLE } from "~/constants";
import { link } from "styled-system/recipes/link";
import { linkScope } from "styled-system/recipes";

import { CgDarkMode } from "solid-icons/cg";
import { CgMenu } from "solid-icons/cg";
import { SiLinkedin } from "solid-icons/si";
import { SiGithub } from "solid-icons/si";
import { SquaresBg } from "./SquaresBg";

const LINK_AREA = "menu";

// The BlobMenu - Uses screen width to disperse menu blob items
const BlobMenu = clientOnly(() => import("./BlobMenu"));

const styles = {
  menuBar: cx(
    css({
      padding: "2px",
      display: "flex",
      justifyContent: "space-between",
      // borderBottom: "1px solid {colors.border.subtle}",
      width: "100%",
      background: "{colors.background.tinted}"
    })
  ),
  menuFirstLast: cx(
    center(),
    css({
      flexGrow: "0",
    })
  ),
  menuCenter: cx(
    center(),
    css({
      flexGrow: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      "& *": {
        margin: "0px",
      },
    })
  ),
  siteTitle: cx(
    css({
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      "& *": {
        margin: "0px",
      },
    }),
    linkScope({ area: LINK_AREA })
  ),
  titleText: css({
    fontSize: {
      base: "{fontSizes.lg}",
      mdToXl: "{fontSizes.2xl}",
    },
  }),
  subTitleText: css({
    fontSize: {
      base: "{fontSizes.sm}",
      mdToXl: "{fontSizes.lg}",
    },
  }),
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
    <div class={styles.menuBar}>
      <SquaresBg>
        <div class={styles.menuFirstLast}>
          <button
            ref={setMenuToggleRef}
            class={styles.menuButton}
            style={{ "z-index": 10, "pointer-events": "auto" }}
            onClick={() => {
              setMenuIsOpen(!menuIsOpen());
            }}
            aria-label={menuIsOpen() ? "Close menu" : "Open menu"}
          >
            <CgMenu size={26} />
          </button>
        </div>
      </SquaresBg>

      <div style={{ position: "absolute" }}>
        <BlobMenu
          zIndex={9}
          links={PRIMARY_MENU_LINKS}
          isOpen={menuIsOpen}
          setIsOpen={setMenuIsOpen}
          menuToggleRef={menuToggleRef}
        />
      </div>

      <SquaresBg>
        <div class={styles.menuCenter}>
          <div class={styles.siteTitle}>
            <a href="/">
              <h2 class={styles.titleText}>{SITE_TITLE}</h2>
            </a>
          </div>
          <div class={styles.subTitleText}>{SITE_SUB_TITLE}</div>
        </div>
      </SquaresBg>

      <SquaresBg>
        <div class={styles.menuFirstLast}>
          <a
            href="https://www.github.com/gnimmelf/"
            target="_blank"
            class={styles.menuButton}
          >
            <SiGithub size={23} />
          </a>

          <a
            href="https://www.linkedin.com/in/gnimmelf/"
            target="_blank"
            class={styles.menuButton}
          >
            <SiLinkedin size={23} />
          </a>

          <button
            class={styles.menuButton}
            style={{ "z-index": 8 }}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <CgDarkMode size={27} />
          </button>
        </div>
      </SquaresBg>
    </div>
  );
}
