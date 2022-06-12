import multiInput from "rollup-plugin-multi-input"
import postcss from "rollup-plugin-postcss"
import typescript from "rollup-plugin-typescript2"

import pkg from "./package.json"

export default {
  external: [...(Object.keys(pkg.peerDependencies) || {})],
  input: [
    "src/components/**/*[!.test].ts",
    "src/components/**/*[!.test].tsx",
    "src/components/**/*[!.stories].tsx",
    "src/styles/**/*.ts",
    "src/utils/**/*[!.test].ts",
  ],
  output: {
    dir: pkg.module,
    format: "es",
  },
  plugins: [
    multiInput({
      relative: "src/",
    }),
    postcss({
      extensions: [".css"],
    }),
    typescript({
      tsconfigOverride: {
        exclude: ["**/__tests__", "**/*.stories.tsx", "**/*.test.ts", "**/*.test.tsx", "src/mocks"],
      },
    }),
  ],
}
