# Svelte Component Generator

## Getting Started

Install it via npm:

```shell
npm install svelte-component-generator -g
```

```shell
svgen componentName
```

### Base Path:

By default, the prompt is set to the current directory.
To change it, add to the root `package.json` the following config:

```
"svelte": {
  "basePath": "./src/app/"
}
```

The path should be relative to the `package.json`.
