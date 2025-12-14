import js from "@eslint/js";
import custom from "eslint-custom-plugin";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      custom,
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
      "custom/avoid-names": "error",
    },
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },
]);
