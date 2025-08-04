import express from 'express';
import {
  appLogger,
  errorHandlerWrapper,
  loggerMiddleware,
} from '@connect-ecosystem-api/shared';
import { env } from './config/env';
import { getApiServiceRoutes } from './routes';

const host = env.host;
const port = env.port;
const app = express();

app.use(express.json())
app.use(loggerMiddleware(appLogger))

const apiRoutes = getApiServiceRoutes()

app.use('/api', apiRoutes)

errorHandlerWrapper(app)

app.get('/', (req, res) => {
  res.send({ message: 'Hello API gateway - ' });
});

app.listen(port, host, () => {
  appLogger.info(`[ ready ] http://${host}:${port}`);
});
