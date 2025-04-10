import * as lch from '../style-extensions/color-ramp'

const dir = (arg: any) => console.dir(arg, { depth: null })

const base = {
  l: 50,
  c: 100,
  h: 0,
}

const scientific = lch.createScientificPalettes(base)

dir({ scientific })

const hues = lch.createHueShiftPalette(base, {
  minLightness: 10,
  maxLightness: 90,
  hueStep: 12
 })

dir({ hues })

// const ramps = palettes.map(palette => lch.createRamp(colors)

