/**
 *  Launch App into Server
 */
import app from "./app";

/**
 * Import required module
 */
import {AppDataSource} from "./utils/data-source";
import {WinstonLogger} from "./utils/logger";


/**
 *  Launch Server
 */
const logger = new WinstonLogger('Database Connection')
AppDataSource.initialize().then(async () => {
    logger.info(`Database Connection Successful !!!`)
    app.listen(app.get('port'), () => {
        console.log(`App is running at http://localhost:${app.get('port')}`);
        console.log(`Press CTRL-C to stop`);
    });
});

