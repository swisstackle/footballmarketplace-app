import express from "express";
import path from "path";
import winston from "winston";
// import serviceRoutes from "routes/service";
// import userRoutes from "routes/user";

const port : number = 3000;
const app = express();
app.use(express.json());

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.Console(),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
app.get('/',(req, res, next) => {
    res.send("Root route is working");
});

module.exports = app.listen(port, () => {
    logger.log({
        level: 'info',
        message: 'Server started at http://localhost:${port}'
    });
});