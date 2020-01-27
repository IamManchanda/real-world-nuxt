const express = require("express");
const { Nuxt, Builder } = require("nuxt");
const jsonServer = require("json-server");
const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

app.set("port", port);

// Import and Set Nuxt.js options
const config = require("./nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

const bootFrontend = async () => {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);
};

const startServer = () => {
  // Boot Frontend
  bootFrontend();

  // Listen the server
  app.listen(port, host);
  console.log(`Server listening on http://${host}:${port}`); // eslint-disable-line no-console
};
startServer();