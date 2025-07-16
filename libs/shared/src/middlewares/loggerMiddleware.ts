import morgan from 'morgan';
import { Logger } from 'winston';

export const loggerMiddleware = (logger: Logger) => morgan(
  `:remote-addr 
  - :remote-user 
  [:date[clf]] 
  ":method :url HTTP/:http-version" 
  req-content-length 
  :req[content-length] 
  res-content-length 
  :res[content-length] 
  :status 
  :response-time ms`,
  {
    stream: {
      write: message => logger.http(message.trim()),
    },
  },
)
