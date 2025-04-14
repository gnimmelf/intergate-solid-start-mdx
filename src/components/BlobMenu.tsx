import { Portal } from "solid-js/web";
import { Accessor, createSignal, For, Setter } from "solid-js";
import Dismissible from "solid-dismissible";
import { css, cx } from "styled-system/css";

const MENU_OFFSET = "50px";

const styles = {
  backDropBlur: css({
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100vw",
    height: "100vh",
    backdropFilter: "auto",
    backdropBlur: "sm",
  }),
  blobMenu: cx(
    css({
      position: "fixed",
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      filter: "url(#goo)",
    })
  ),

  blob: css({
    "--scale": "1",
    "--speed": "0.55",
    "--ease": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",

    position: "absolute",
    top: `-${MENU_OFFSET}`,
    left: `-${MENU_OFFSET}`,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "40%",
    textDecoration: "none",
    pointerEvents: "auto",
    background: "{colors.menu.background}",
    color: "{colors.menu.foreground}",

    // TODO! Make invisible on closed
    opacity: "0",
    transition: `all calc(var(--speed, 1) * 1s) calc(var(--delay, 0) * 1s) var(--ease)`,
    width: "150px",
    height: "100px",
  }),

  open: css({
    "& > *": {
      transform: "translate(var(--x), var(--y)) scale(var(--scale, 1))",
      opacity: "1",
    },
  }),

  link: css({
    fontSize: "1rem",
    transition: "none",
    _hover: {
      color: "{colors.menu.hover}",
    },
  }),
};

const getBlobPosition = (index: number, total: number) => {
  const angle = index * 2.39998; // Golden angle (~137.5 degrees in radians)
  const radius = (8 + Math.random() * 2) * (1 + index / total);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return {
    x: `calc(220px + ${MENU_OFFSET} + ${x} * 8px)`,
    y: `calc(170px + ${MENU_OFFSET} + ${y} * 8px)`,
  };
};

const SvgFilters = function () {
  return (
    <Portal isSVG={true}>
      <svg>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </Portal>
  );
};

export function BlobMenu(props: {
  zIndex: number;
  links: { label: string; href: string }[];
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
  outsidePointerIgnore?: HTMLElement[]
}) {
  const [contentRef, setContentRef] = createSignal<HTMLElement | null>(null);

  return (
    <>
      <SvgFilters />

      <div
        style={{ "z-index": props.zIndex }}
        class={cx(props.isOpen() && styles.backDropBlur)}
      ></div>

      <Dismissible
        element={contentRef}
        enabled={props.isOpen()}
        onDismiss={(...args) => {
          console.log('dismissed', ...args)
          props.setIsOpen(false)
        }}
        outsidePointerIgnore={props.outsidePointerIgnore}
      >
        <div
          ref={setContentRef}
          class={cx(styles.blobMenu, props.isOpen() && styles.open)}
          style={{ "z-index": props.zIndex }}
        >
          <For each={props.links}>
            {(link, idx) => {
              const { x, y } = getBlobPosition(idx(), props.links.length);
              return (
                <span
                  class={styles.blob}
                  style={{
                    "z-index": `${props.links.length - idx()}`,
                    "--delay": `${(idx() + 1) * 0.02}`,
                    "--x": x,
                    "--y": y,
                  }}
                >
                  <a class={styles.link} href={link.href}>
                    {link.label}
                  </a>
                </span>
              );
            }}
          </For>
        </div>
      </Dismissible>
    </>
  );
}
