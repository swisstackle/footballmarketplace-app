import express, { NextFunction, Request, Response, Router } from 'express';
import 'express-async-errors'; // Async errors are redirected to error handling middleware
import { datasource } from '../../db/connection';
import { Service } from '../../db/entities/service.entity';
import { Servicebought } from '../../db/entities/service_bought.entity';
import bcrypt from 'bcrypt';
import { User } from '../../db/entities/user.entity';

const router: Router = express.Router();

router.get(
  '/getAdmittedServices',
  async (req: Request, res: Response, next: NextFunction) => {
    /*      #swagger.auto = false
            #swagger.method = 'get'
            #swagger.description = 'Will return the admitted services tied to a specific ethereum address.'
            #swagger.parameters['address'] = {
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
            #swagger.method = 'get'
            #swagger.description = 'Will return the requested service creations tied to a specific ethereum address.'
            #swagger.parameters['address'] = {
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

router.post('/buy', async (req: Request, res: Response, next: NextFunction) => {
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
                    name: "Service Name Example",
                    password: "P4ssw0rd"
                }
            }
      */
  const availableServices: Service[] = await datasource
    .getRepository(Service)
    .createQueryBuilder()
    .where('name = :name', { name: req.body.name })
    .andWhere('isapproved = :isapproved', { isapproved: true })
    .getMany();

  const user: User = await datasource
    .getRepository(User)
    .createQueryBuilder()
    .where('address = :address', { address: req.body.address })
    .getOne();

  let isValid: boolean = false;

  if (user != null) {
    const hash: string = user.password;
    const passwordCorrect: boolean = await bcrypt.compare(
      req.body.password,
      hash
    );
    if (passwordCorrect) {
      isValid = true;
    }
  }

  if (availableServices.length !== 0 && isValid) {
    const hash = user.password;

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
  } else {
    next(
      new Error(
        'Wrong password or we could not find a service with the provided service name.'
      )
    );
  }
});

router.get(
  '/getallservices',
  async (req: Request, res: Response, next: NextFunction) => {
    /*      #swagger.auto = false
            #swagger.method = 'get'
            #swagger.description = 'Will return all admitted services given an ethereum address.'
            #swagger.parameters['address'] = {
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
  async (req: Request, res: Response, next: NextFunction) => {
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
                    description: "Service Description Example.",
                    password: "Ex4mpleP4ssw0rd"
                }
            }
      */
    try {
      const user: User = await datasource
        .getRepository(User)
        .createQueryBuilder()
        .where('address = :address', { address: req.body.address })
        .getOne();
      let isValid: boolean = false;
      if (user != null) {
        const hash: string = user.password;
        const passwordCorrect: boolean = await bcrypt.compare(
          req.body.password,
          hash
        );
        if (passwordCorrect) {
          isValid = true;
        }
      }
      if (isValid) {
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
          .execute()
          .then(() => {
            res.send('Success');
          });
      } else {
        next(new Error('Wrong password.'));
      }
    } catch (err) {
      next(err);
    }
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
                    name: "Service Name Example.",
                    address: "address of coach",
                    password: "Ex4mpl3P4ssw0rd"
                }
            }
      */
    try {
      const user: User = await datasource
        .getRepository(User)
        .createQueryBuilder()
        .where('address = :address', { address: req.body.address })
        .getOne();
      let isValid: boolean = false;
      if (user != null) {
        const hash: string = user.password;
        const passwordCorrect: boolean = await bcrypt.compare(
          req.body.password,
          hash
        );
        if (passwordCorrect && user.iscoach) {
          isValid = true;
        }
      }
      if (isValid) {
        await datasource
          .createQueryBuilder()
          .update(Service)
          .set({ isapproved: true })
          .where('name = :name', { name: req.body.name })
          .execute();
        res.send('Success');
      } else {
        next(new Error('Wrong password or not a coach.'));
      }
    } catch (err) {
      next(err);
    }
  }
);

export default router;
