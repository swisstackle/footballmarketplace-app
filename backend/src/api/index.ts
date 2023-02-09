import express, { NextFunction, Request, Response, Application } from 'express';
import logger from '../logger';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerFile from './swagger/swagger-output.json';
import serviceRouter from './routes/service';
import userRouter from './routes/user';
import StatusCodes from 'http-status-codes';
import { datasource } from '../db/connection';
import { DataSource } from 'typeorm';

const port: number = Number(process.env.PORT || 3000);
export const app: Application = express();
app.use(express.json());
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Root route is working');
});
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/services', serviceRouter);
app.use('/users', userRouter);

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(StatusCodes.BAD_REQUEST).json({
    error: err.message
  });
});
export const initDb = async () => {
  await datasource.initialize();
};
export const startListening = () => {
  return app.listen(port, () => {
    logger.info('Server started at http://localhost:${port}');
  });
};
export const init = async () => {
  await initDb();
  return startListening();
};
export const teardownDb = async () => {
  await datasource.destroy();
};
