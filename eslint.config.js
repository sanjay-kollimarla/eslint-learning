import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import customRules from "./rules/index.js";
import rulesData from "./data/rules/index.js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      custom: {
        rules: {
          "avoid-names": customRules.avoidNames,
        },
      },
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "arrow-parens": ["error", "always"],
      "eol-last": ["error", "always"],
      "no-trailing-spaces": "error",
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "space-before-blocks": ["error", "always"],
      "space-infix-ops": "error",
      "spaced-comment": ["error", "always"],
      "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "computed-property-spacing": ["error", "never"],
      "func-call-spacing": ["error", "never"],
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
      "custom/avoid-names": ["error", { names: rulesData.avoidNames.namesToAvoid, caseInsensitive: true }],
    },
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },
]);
