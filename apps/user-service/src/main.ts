import express from 'express';
import { appLogger, shared } from '@connect-ecosystem-api/shared';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4002;
const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' + shared() });
});

app.listen(port, host, () => {
  appLogger.info(`[ ready ] http://${host}:${port}`);
});
