# v-router

A basic lightweight implementation of a router similar to React Router, just for learning purposes. 

The main part of the source code consists of:

1. The router library components `Router`, `Route` and `Link`. When building these components for publishing to npm, `tsup` is used as the compiler and bundler while `tsc` (Typescript compiler) is just used as type-checker.

2. A basic React application built with Vite for testing the router in development.

## Instructions:

### Installing
```js
pnpm install
```

### Running development environment
```js
pnpm run dev
```

### Runnint tests
```js
pnpm run test
```

### Building the package
```js
pnpm run build
```
This process is automatically performed on each PR merged to `main` with a Github workflow (`.github/workflows/publish.yml`).