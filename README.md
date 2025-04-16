# Intergate.io - Solid Start

Utilizing solid-start and mdx.

Deploy to deno.

## Panda CSS

Panda CSS relies on generating exports based on `panda.config`.

This means that `dev` and `prod` need to be preapred ahead of time, so switching between building for `prod` (for deploy) and `dev` needs a re-run of `panda codegen` inbetween, which rebuilds panda assets in `/styled-system/`.

Ideally `package.json::scripts` should be set up to run concurrently, with

- `dev` using `NODE_ENV=dev panda --watch` and concurrently `vinxi dev`
- `build` using `NODE_ENV=prod panda codegen && vinxi build`

...but I just can't be bothered right now.