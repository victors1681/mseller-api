module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  extends: [ 
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "no-console": "off",
    "import/no-unresolved": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-unused-vars": "off"
  }
};
