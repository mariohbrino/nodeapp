module.exports = {
  proxy: "localhost:3000",
  files: ["public/css/**/*.css", "src/**/*.ts", "src/view/**/*.hbs"],
  port: 3001,
  open: false,
  notify: false,
  ui: {
    port: 3002,
  },
  ghostMode: false,
  reloadOnRestart: true,
  watchOptions: {
    ignoreInitial: true,
    ignored: ["node_modules", "dist"],
  },
};
