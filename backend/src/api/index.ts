import express from 'express';
import winston from 'winston';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Footballmarketplace',
    description: 'RestAPI of the football marketplace'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './backend/swagger-output.json';
const endpointsFiles = ['./src/api/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);

const port: number = Number(process.env.PORT);
const app = express();
app.use(express.json());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console()
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}
app.get('/', (req, res, next) => {
  res.send('Root route is working');
});

module.exports = app.listen(port, () => {
  logger.log({
    level: 'info',
    message: 'Server started at http://localhost:${port}'
  });
});
