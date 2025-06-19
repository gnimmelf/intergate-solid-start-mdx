export type LCh = {
  l: number // 0-100 - Percieved brightness
  c: number // 0-150 - Chroma (roughly representing the "amount of color")
  h: number // 0-360 - Hue angle, see https://luncheon.github.io/lch-color-wheel/
  /**
   * LCh step samples
   * lch(80% 150 30deg)
   * lch(80% 150 60deg)
   * lch(80% 150 120deg)
   * lch(80% 150 180deg)
   * lch(80% 150 240deg)
   * lch(80% 150 360deg)
   */
}