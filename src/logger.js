import {createLogger,transports,format} from "winston";

export const logger = createLogger({
    level: 'debug',
    format: format.simple(),
    transports: [new transports.Console()]
});

logger.info('Hello world');