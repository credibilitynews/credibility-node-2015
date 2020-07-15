// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";
import path from "path";

const projectRootDir = path.resolve(__dirname);
replace({
  "process.env.NODE_ENV": JSON.stringify("production"),
});
export default {
  input: "src/js/index.js",
  output: {
    file: "../backend/public/js/bundle.js",
    format: "iife",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    resolve({
      browser: true,
      extensions: [".js", ".jsx", ".json"],
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
      plugins: ["@babel/proposal-class-properties"],
      exclude: /node_modules/,
    }),
    alias({
      entries: [
        {
          find: "components",
          replacement: path.resolve(projectRootDir, "src/js/components"),
        },
        {
          find: "actions",
          replacement: path.resolve(projectRootDir, "src/js/actions"),
        },
        {
          find: "stores",
          replacement: path.resolve(projectRootDir, "src/js/stores"),
        },
        {
          find: "dispatchers",
          replacement: path.resolve(projectRootDir, "src/js/dispatchers"),
        },
        {
          find: "constants",
          replacement: path.resolve(projectRootDir, "src/js/constants"),
        },
        {
          find: "utils",
          replacement: path.resolve(projectRootDir, "src/js/utils"),
        },
        {
          find: "app-link",
          replacement: path.resolve(projectRootDir, "src/js/app-link"),
        },
        {
          find: "pre-fetchable",
          replacement: path.resolve(projectRootDir, "src/js/pre-fetchable"),
        },
      ],
    }),
    commonjs(),
  ],
  // indicate which modules should be treated as external
  // external: ["lodash"],
};
