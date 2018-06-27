// Import everything from express and assign it to the express variable
import dotenv from "dotenv";
import express, {
  NextFunction,
  Request,
  Response,
} from "express";
import twig from "twig";

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
app.use(express.static("public"));

/**
 * Controllers and routes
 */

// Mount the RestaurantController at the /restaurants route
app.use("/", HomeController);
// app.use("/restaurants/", RestaurantController);

export default app;
