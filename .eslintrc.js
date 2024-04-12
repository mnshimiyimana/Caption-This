module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended", "prettier"],
  ignorePatterns: [
    "node_modules/*",
    ".next/*",
    ".out/*",
    "!.prettierrc.js",
    ".eslintrc.*",
  ],

  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
      parser: "@typescript-eslint/parser",
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
      {
        usePrettierrc: true,
      },
    ],
    "no-unused-vars": "error",
    "no-console": ["warn"],
    "no-return-assign": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "@typescript-eslint/strict-boolean-expressions": ["off"],
    "@typescript-eslint/no-confusing-void-expression": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-misused-promises": ["off"],
    "@typescript-eslint/no-floating-promises": ["off"],
    "no-alert": "error",
    "no-dupe-keys": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-nested-ternary": "error",
    "no-var": "error",
    "no-duplicate-imports": "error",
  },
}
