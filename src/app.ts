// Import everything from express and assign it to the express variable
import compression from "compression";
import dotenv from "dotenv";
import express, {
  NextFunction,
  Request,
  Response,
} from "express";
import minify from "express-minify";
import minifyHTML from "express-minify-html";
import sslRedirect from "heroku-ssl-redirect";
import lusca from "lusca";
import Raven from "raven";
import slugid from "slugid";
import twig from "twig";
import uglifyEs from "uglify-es";

dotenv.config();

// Import RestaurantController from controllers entry point
import {
  HomeController,
} from "./controllers";

twig.extendFunction("getenv", (name: string) => {
  return process.env[name];
});

/**
 * Is server in production mode?
 */
const production = process.env.NODE_ENV === "production";

twig.extendFunction("isProd", () => {
  return production.toString();
});

/**
 * Create a new express application instance
 */
const app: express.Application = express();

/**
 * Static assets
 */
app.use(compression());
app.use(express.static("public"));

/**
 * Controllers and routes
 */

// Mount the RestaurantController at the /restaurants route
app.use("/", HomeController);
// app.use("/restaurants/", RestaurantController);

export default app;
