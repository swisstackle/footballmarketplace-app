import express, { NextFunction, Request, Response, Router } from 'express';
import 'express-async-errors'; // Async errors are redirected to error handling middleware
import { datasource } from '../../db/connection';
import { User } from '../../db/entities/user.entity';
import { Service } from '../../db/entities/service.entity';
import { Servicebought } from '../../db/entities/service_bought.entity';

const router: Router = express.Router();

router.get(
  '/getAdmittedServices',
  async (req: Request, res: Response, next: NextFunction) => {
    /*      #swagger.auto = false
            #swagger.path = '/services/getAdmittedServices'
            #swagger.method = 'get'
            #swagger.description = 'Will return the admitted services tied to a specific ethereum address.'
            #swagger.parameters['address'] = {
                in: 'path',
                description: 'Ethereum address of wallet requesting list.',
                required: true
            }
      */
    const newServices: Service[] = await datasource
      .getRepository(Service)
      .createQueryBuilder()
      .where('address = :address', { address: req.query.address })
      .andWhere('isapproved = :isapproved', { isapproved: true })
      .getMany();
    res.json(newServices);
  }
);

router.get(
  '/getServiceRequests',
  async (req: Request, res: Response, next: NextFunction) => {
    /*      #swagger.auto = false
            #swagger.path = '/services/getServiceRequests'
            #swagger.method = 'get'
            #swagger.description = 'Will return the requested service creations tied to a specific ethereum address.'
            #swagger.parameters['address'] = {
                in: 'path',
                description: 'Ethereum address of wallet requesting list.',
                required: true
            }
      */
    const newServices: Service[] = await datasource
      .getRepository(Service)
      .createQueryBuilder()
      .where('address = :address', { address: req.query.address })
      .andWhere('isapproved = :isapproved', { isapproved: false })
      .getMany();
    res.json(newServices);
  }
);

router.post('/buy', (req: Request, res: Response, next: NextFunction) => {
  /*      #swagger.auto = false
            #swagger.path = '/services/buy'
            #swagger.method = 'post'
            #swagger.description = 'Will buy a given service with an ethereum address.'
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Ethereum address of buyer and service name.',
                required: true,
                schema: {
                    address: "0xdB055877e6c13b6A6B25aBcAA29B393777dD0a73",
                    name: "Service Name Example"
                }
            }
      */
  datasource
    .createQueryBuilder()
    .insert()
    .into(Servicebought)
    .values({
      buyeraddress: req.body.address,
      servicename: req.body.name
    })
    .execute();
  res.send('Success');
});

router.get(
  '/getallservices',
  async (req: Request, res: Response, next: NextFunction) => {
    /*      #swagger.auto = false
            #swagger.path = '/services/getallservices'
            #swagger.method = 'get'
            #swagger.description = 'Will return all admitted services given an ethereum address.'
            #swagger.parameters['address'] = {
                in: 'path',
                description: 'Ethereum address of wallet requesting list.',
                required: true
            }
      */

    const newServices: Service[] = await datasource
      .getRepository(Service)
      .createQueryBuilder()
      .where('isapproved = :isapproved', { isapproved: true })
      .getMany();
    res.json(newServices);
  }
);

router.post(
  '/requestRegisterService',
  (req: Request, res: Response, next: NextFunction) => {
    /*      #swagger.auto = false
            #swagger.path = '/services/requestRegisterService'
            #swagger.method = 'post'
            #swagger.description = 'Will put in a new service request.'
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Ethereum address of buyer and service name.',
                required: true,
                schema: {
                    address: "0xdB055877e6c13b6A6B25aBcAA29B393777dD0a73",
                    name: "Service Name Example.",
                    description: "Service Description Example."
                }
            }
      */
    datasource
      .createQueryBuilder()
      .insert()
      .into(Service)
      .values({
        address: req.body.address,
        description: req.body.description,
        name: req.body.name,
        isapproved: false
      })
      .execute();
    res.send('Success');
  }
);

router.post(
  '/admitservice',
  async (req: Request, res: Response, next: NextFunction) => {
    /*      #swagger.auto = false
            #swagger.path = '/services/admitservice'
            #swagger.method = 'post'
            #swagger.description = 'Will admit a service.'
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Ethereum address of buyer and service name.',
                required: true,
                schema: {
                    name: "Service Name Example."
                }
            }
      */

    await datasource
      .createQueryBuilder()
      .update(Service)
      .set({ isapproved: false })
      .where('name = :name', { name: req.body.name })
      .execute();
    res.send('Success');
  }
);

export default router;
