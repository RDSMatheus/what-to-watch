import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Regras para arquivos TypeScript e JavaScript na pasta src
  {
    files: ["src/**/*.{js,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: { project: "./tsconfig.json" },
      globals: { ...globals.node, ...globals.browser },
    },
    plugins: { js, "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": "warn",
      "no-unused-vars": "warn",
      "eqeqeq": "error",
    },
  },

  // Configurações recomendadas do ESLint e TypeScript
  js.configs.recommended,
  tseslint.configs.recommended,

  // Regras específicas para arquivos da pasta prisma e arquivos wasm.js
  {
    files: ["prisma/**", "src/prisma/**", "**/*.wasm.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: { ...globals.node },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
    },
  },

  // Ignorar arquivos de build, node_modules e client gerado pelo Prisma
  {
    ignores: [
      "node_modules/",
      "dist/",
      "app/generated/",
      "*.d.ts",
    ],
  },
]);
