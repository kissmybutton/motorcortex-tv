import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
export default [
  {
    input: "src/index.js",
    external: ["@kissmybutton/motorcortex"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [commonjs(), babel(), json()],
  },
  {
    input: "src/index.js",
    external: ["@kissmybutton/motorcortex"],
    output: [
      {
        globals: {
          "@kissmybutton/motorcortex": "MotorCortex",
        },
        name: pkg.name,
        file: pkg.browser,
        format: "umd",
      },
    ],
    plugins: [
      nodeResolve({ mainFields: ["module", "main", "browser"] }),
      commonjs(),
      babel(),
      terser(),
      json(),
    ],
  },
];
