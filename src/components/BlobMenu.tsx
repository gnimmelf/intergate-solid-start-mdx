import { Portal } from "solid-js/web";
import {
  Accessor,
  createSignal,
  For,
  onCleanup,
  onMount,
  Setter,
} from "solid-js";
import Dismissible from "solid-dismissible";
import { css, cx } from "styled-system/css";
import { debounce } from "~/utils/debounce";

type Vector2 = [number, number];

const MAX_BLOB_RECT: Vector2 = [500, 600];

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

      // Blob dispersion variables
      "--width": "150px",
      "--height": "100px",
      "--offset-x": "-50px",
      "--offset-y": "-40px",
      // Initial start
      left: "var(--offset-x)",
      top: "var(--offset-y)",
    })
  ),

  blob: css({
    "--speed": "0.55",
    "--ease": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",

    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "40%",
    textDecoration: "none",
    pointerEvents: "auto",
    background: "{colors.surface.background}",
    color: "{colors.surface.foreground}",

    opacity: "0",
    transform: "scale(0.5)",
    transition: `all calc(var(--speed, 1) * 1s) var(--ease)`,
    width: "var(--width)",
    height: "var(--height)",
  }),

  open: css({
    "& > *": {
      transform: "translate(var(--x), var(--y)) scale(1)",
      opacity: "1",
    },
  }),

  link: css({
    fontSize: "1rem",
    transition: "none",
    _hover: {
      color: "{colors.surface.accent}",
    },
  }),
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

function setBlobPositions(blobRefs: HTMLElement[], blobRect: Vector2) {
  const blobs = blobRefs.filter(Boolean);

  const centerX = blobRect[0] / 2;
  const centerY = blobRect[1] / 2;

  const goldenAngle = 2.399963; // radians
  const baseRadius = 40;
  const spacingPadding = 2; // extra spacing to prevent touching

  const placed: { x: number; y: number; radius: number }[] = [];

  blobs.forEach((ref, idx) => {
    const blobWidth = ref.offsetWidth;
    const blobHeight = ref.offsetHeight;

    const effectiveRadius =
      Math.min(blobWidth, blobHeight) / 2 + spacingPadding;

    let angle = idx * goldenAngle;
    let radius = baseRadius;
    const maxRadius = 300;

    let found = false;
    let x = 0;
    let y = 0;

    for (let attempts = 0; attempts < 150 && radius < maxRadius; attempts++) {
      x = Math.cos(angle) * radius;
      y = Math.sin(angle) * radius;

      const screenX = centerX + x;
      const screenY = centerY + y;

      // Make sure blob fits fully on screen
      const fitsOnScreen =
        screenX - blobWidth / 2 > 0 &&
        screenX + blobWidth / 2 < innerWidth &&
        screenY - blobHeight / 2 > 0 &&
        screenY + blobHeight / 2 < innerHeight;

      // Make sure it doesn’t overlap with any placed blob
      const doesOverlap = placed.some((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < p.radius + effectiveRadius;
      });

      if (fitsOnScreen && !doesOverlap) {
        found = true;
        break;
      }

      radius += 6;
      angle += goldenAngle * 0.25; // slow spiral
    }

    placed.push({ x, y, radius: effectiveRadius });

    const cancelInitialOffsetX = `(0px - var(--offset-x))`;
    const cancelInitialOffsetY = `(0px - var(--offset-y))`;

    const finalX = `calc(${centerX}px + ${x}px - (${cancelInitialOffsetX}) / 2)`;
    const finalY = `calc(${centerY}px + ${y}px - (${cancelInitialOffsetY}) / 2)`;

    ref.style.setProperty("--x", finalX);
    ref.style.setProperty("--y", finalY);
  });
}

export function BlobMenu(props: {
  zIndex: number;
  links: { label: string; href: string }[];
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
  menuToggleRef: Accessor<HTMLElement | null>;
}) {
  const [dismissableRef, setDismissableRef] = createSignal<HTMLElement | null>(
    null
  );
  const [blobRefs, _setBlobRefs] = createSignal<HTMLElement[]>([]);
  const [blobRect, _setBlobRect] = createSignal(MAX_BLOB_RECT);

  function addBlobRef(ref: HTMLElement, idx: number) {
    // Update the refs array at the current index
    _setBlobRefs((prev) => {
      const newRefs = [...prev];
      newRefs[idx] = ref;
      return newRefs;
    });
  }

  function setBlobRect() {
    const { innerWidth } = window;
    const newRect: Vector2 = [
      innerWidth > MAX_BLOB_RECT[0] ? MAX_BLOB_RECT[0] : innerWidth,
      MAX_BLOB_RECT[1],
    ];
    if (blobRect()[0] !== newRect[0] || blobRect()[1] !== newRect[1]) {
      _setBlobRect(newRect);
    }
  }

  const debounceResize = debounce(() => {
    setBlobRect();
    setBlobPositions(blobRefs(), blobRect());
  }, 10);

  onMount(() => {
    setBlobRect();
    setBlobPositions(blobRefs(), blobRect());
    window.addEventListener("resize", debounceResize);
    onCleanup(() => {
      window.removeEventListener("resize", debounceResize);
      debounceResize.cancel();
    });
  });

  return (
    <>
      <SvgFilters />
      <div
        style={{ "z-index": props.zIndex }}
        class={cx(props.isOpen() && styles.backDropBlur)}
      ></div>

      <Dismissible
        element={dismissableRef}
        enabled={props.isOpen()}
        onDismiss={() => props.setIsOpen(false)}
        outsidePointerIgnore={[props.menuToggleRef()]}
      >
        <div
          ref={setDismissableRef}
          class={cx(styles.blobMenu, props.isOpen() && styles.open)}
          style={{ "z-index": props.zIndex }}
        >
          <For each={props.links}>
            {(link, idx) => {
              return (
                <span
                  ref={(el) => addBlobRef(el, idx())}
                  class={styles.blob}
                  style={{
                    "z-index": `${props.links.length - idx()}`,
                    "--delay": `${(idx() + 1) * 0.02}`,
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

export default BlobMenu;
