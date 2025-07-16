import path from 'path';
import * as winston from 'winston';

const executedRoot = path.dirname('./')

export const appLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack, stackMessage }) =>
      `${timestamp} [${level}]: ${stackMessage || stack || message}`,
    ),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.colorize({ all: true }),
    }),
    new winston.transports.File({ filename: path.join(executedRoot, './logs/error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(executedRoot, './logs/combined.log') }),
    new winston.transports.File({ filename: path.join(executedRoot, './logs/http.log'), level: 'http' }),
  ],
})
