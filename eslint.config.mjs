import { dirname } from "path";
import { fileURLToPath } from "url";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...coreWebVitals,
  ...nextTypescript,
  {
    settings: {
      next: {
        rootDir: __dirname,
      },
    },
  },
];

export default config;
