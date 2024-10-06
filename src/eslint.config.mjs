// eslint.config.mjs
// @ts-check

import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";

export default [
   {
      files: ["**/*.ts", "**/*.tsx"], // Apply the config only to TypeScript files
      languageOptions: {
         parser: tsParser, // Use TypeScript parser
         parserOptions: {
            tsconfigRootDir: import.meta.dirname,
            project: "../tsconfig.json", // Path to your TypeScript config file
         },
      },
      plugins: {
         "@typescript-eslint": tseslint,
      },
      rules: {
         // Add your existing custom rules here
         "no-console": "warn",
         "no-unused-vars": "warn",
         "prefer-const": "error",
         "@typescript-eslint/explicit-function-return-type": "off",
         "@typescript-eslint/no-var-requires": "off",
         "dot-notation": "error",
      },
   },
   // Apply the Prettier config at the end to disable formatting rules
   prettierConfig,
];
