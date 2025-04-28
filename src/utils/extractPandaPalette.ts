import { Token, token } from "styled-system/tokens";

export function extractPandaPalette(colorPrefix: string) {
  // Extract colors from Panda CSS tokens based on colorPrefix prop
  return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    .map((idx) => {
      const key = `${colorPrefix}.${idx}`
      const value = token(key as Token)
      return {
        key,
        value,
      } as {
        key: string
        value: string
        [x: string]: string
      }
    })
    .filter(({value}) => !!value) // Remove undefined/null values
}
