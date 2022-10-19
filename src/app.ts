/**
 *  Required Modules
 */
import "reflect-metadata"
import express from "express";
import Routes from "./routes";
import ErrorMiddleware from "./middlewares/error.middleware";


/**
 *  Initiate Express App
 */
const app = express();

/**
 *  App Configuration
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * App Variables
 */
app.set('port', process.env.PORT || 3001);

/**
 * Application Routes
 */
app.use('/api/v1', Routes);

/**
 * Error Handler
 */
app.use(ErrorMiddleware);



export default app;