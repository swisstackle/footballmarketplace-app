import express, { NextFunction, Request, Response, Application } from 'express';
import logger from '../logger';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerFile from './swagger/swagger-output.json';
import serviceRouter from './routes/service';
import userRouter from './routes/user';
import StatusCodes from 'http-status-codes';
import { datasource } from '../db/connection';
import { getConnection } from 'typeorm';
import { User } from '../db/entities/user.entity';

datasource
  .initialize()
  .then(() => {
    logger.info('Data Source has been initialized!');
  })
  .catch((err) => {
    logger.error('Error during datasource init', err);
  });

const port: number = Number(process.env.PORT || 3000);
const app: Application = express();
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

module.exports = app.listen(port, () => {
  logger.info('Server started at http://localhost:${port}');
});
