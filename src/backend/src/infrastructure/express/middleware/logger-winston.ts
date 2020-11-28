import winston from 'winston';
import expressWinston from 'express-winston';
import { Express } from 'express';

export const logger = expressWinston.logger({
  level: 'debug',
  format: winston.format.combine(winston.format.splat(), winston.format.simple()),
  transports: [new winston.transports.Console()],
});

export const applyLoggerMiddleware = (expressApp: Express) => {
  expressApp.use(logger);
};
