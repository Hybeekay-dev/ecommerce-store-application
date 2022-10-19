import {transports, Logger, createLogger, LoggerOptions, format} from 'winston';
import {LoggerInterface} from "./shared/interfaces/logger.interface";


const {combine, timestamp, label, prettyPrint} = format;


export class WinstonLogger implements LoggerInterface {

    public logger: Logger;
    public loggerOptions: LoggerOptions;

    constructor(scope: string) {
        this.loggerOptions = {
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.prettyPrint(),
                        format.printf(({timestamp, level, message, metadata}) => {
                            return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(metadata)}`;
                        })
                    ),
                }),
                new transports.File({
                    dirname: "logs",
                    filename: `${new Date().toISOString().substring(0, 10)}.log`,
                    // format: format.combine(format.json(), format.colorize(), format.prettyPrint())
                }),
            ],
            format: combine(label({label: scope}), timestamp(), prettyPrint())
        };
        this.logger = createLogger(this.loggerOptions);
    }

    debug(message: string): void {
        this.logger.debug(message);
    }

    error(message: string): void {
        this.logger.error(message);
    }

    info(message: string): void {
        this.logger.info(message);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }
}