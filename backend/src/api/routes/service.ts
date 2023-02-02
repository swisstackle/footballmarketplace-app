import express, { NextFunction, Request, Response, Router } from 'express';
import 'express-async-errors'; // Async errors are redirected to error handling middleware
const router: Router = express.Router();

router.get(
  '/getAdmittedServices',
  async (req: Request, res: Response, next: NextFunction) => {
    // const results = await db.getAdmittedServices(req.query.address);
    // res.send(results);
  }
);

router.get(
  '/getServiceRequests',
  async (req: Request, res: Response, next: NextFunction) => {
    // const results = await db.getServices();
    // res.send(results);
  }
);

router.delete('/delete', (req: Request, res: Response, next: NextFunction) => {
  // db.deleteService(req.query.address,req.query.name);
  // res.send("Success");
});

router.post('/buy', (req: Request, res: Response, next: NextFunction) => {
  // db.buyService(req.query.servicename, req.query.address);
  // res.send("Success");
});

router.post(
  '/servicedone',
  (req: Request, res: Response, next: NextFunction) => {
    // db.serviceDone(req.query.servicename, req.query.address);
    // res.send("Success");
  }
);

router.get(
  '/getallservices',
  async (req: Request, res: Response, next: NextFunction) => {
    // const results = await db.getAllServices();
    // res.send(results);
  }
);

router.get(
  '/requestRegisterService',
  (req: Request, res: Response, next: NextFunction) => {
    // db.dbRequestRegisterService(req.query.address, req.query.name, req.query.description, req.query.price);
    res.send('Success');
  }
);

router.post(
  '/admitservice',
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceName = req.query.name;
    const address = req.query.address;
    const description = req.query.description;
    // db.deleteServiceRequest(address, serviceName);
    // db.submitService(address, serviceName, description, req.query.price);

    res.send('Success');
  }
);

export default router;
