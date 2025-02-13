import { Hono } from "hono";
import { subscriber } from "./routes/subscriber";
import { ap } from "@faker-js/faker/dist/airline-D6ksJFwG";
import { newsletter } from "./routes/newsletter";

const app = new Hono();

app.route("/subscriber", subscriber);
app.route("/newsletter", newsletter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  fetch: app.fetch,
  port: 8080,
};
