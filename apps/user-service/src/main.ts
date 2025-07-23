import express from 'express';
import { appLogger, shared, JwtAccessPayload } from '@connect-ecosystem-api/shared';
import jwt from 'jsonwebtoken';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4002;
const app = express();

app.use(express.json());

const validateToken = async (token: string): Promise<JwtAccessPayload | null> => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET') as JwtAccessPayload;

    return decoded;
  } catch (error) {
    return null;
  }
};

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' + shared() });
});

app.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header required' });
  }

  const token = authHeader.replace('Bearer ', '');
  const user = await validateToken(token);

  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  res.json({
    message: 'User profile',
    userId: user.userId,
    appId: user.appId,
    jti: user.jti,
  });
});

app.listen(port, host, () => {
  appLogger.info(`[ ready ] http://${host}:${port}`);
});
