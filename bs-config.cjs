require("dotenv").config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const bsPort = process.env.BS_PORT ? parseInt(process.env.BS_PORT, 10) : 3001;
const bsUiPort = process.env.BS_UI_PORT ? parseInt(process.env.BS_UI_PORT, 10) : 3002;

module.exports = {
  proxy: `localhost:${port}`,
  files: ["public/css/**/*.css", "src/**/*.ts", "src/view/**/*.hbs"],
  port: bsPort,
  open: false,
  notify: false,
  ui: {
    port: bsUiPort,
  },
  ghostMode: false,
  reloadOnRestart: true,
  watchOptions: {
    ignoreInitial: true,
    ignored: ["node_modules", "dist"],
  },
};
