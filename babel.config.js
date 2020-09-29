module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/polyfill",
    "@babel/env",
    {
      useBuiltIns: "usage",
      corejs: 3
    }
  ]
};
