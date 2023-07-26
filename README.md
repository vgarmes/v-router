# vite-router

## Testing

Debugging:

```js
console.log(screen.debug());
```

## Compiling package

This library is compiled into an npm-ready package using SWC. Most of the configuration is the default, but there are some overrides in the `.swcrc` file:

- `jsc.transform.react.runtime: "automatic"`: Uses a JSX runtime module [introduced in React 17](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html). This means that the compiler, when it transforms JSX into React function calls that the browser can understand, it doesn't use the old React function `React.createElement(...)` but instead `_jsx(...)`.
