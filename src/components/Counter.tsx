import { createSignal } from "solid-js";
import css from "./counter.module.css";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <button class={css['btn-increment']} onClick={() => setCount(count() + 1)} type="button">
      Clicks: {count()}
    </button>
  );
}
