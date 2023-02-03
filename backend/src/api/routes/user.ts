import express, { NextFunction, Request, Response, Router } from 'express';
import { datasource } from '../../db/connection';
import { User } from '../../db/entities/user.entity';
import { Service } from '../../db/entities/service.entity';
import { Servicebought } from '../../db/entities/service_bought.entity';
const router: Router = express.Router();

router.post('/register', (req, res) => {
  /*      #swagger.auto = false
            #swagger.path = '/users/register'
            #swagger.method = 'post'
            #swagger.description = 'API endpoint to register a new user in the database.'
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Ethereum address of buyer and service name.',
                required: true,
                schema: {
                    username: "Usernameeample",
                    address: "0xdB055877e6c13b6A6B25aBcAA29B393777dD0a73"
                }
            }
      */
  datasource
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      address: req.body.address,
      name: req.body.username,
      iscoach: false
    })
    .execute();

  res.send('Success');
});

router.post(
  '/registercoach',
  (req: Request, res: Response, next: NextFunction) => {
    /*      #swagger.auto = false
            #swagger.path = '/users/registercoach'
            #swagger.method = 'post'
            #swagger.description = 'API endpoint to register a new coach in the database.'
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Ethereum address of buyer and service name.',
                required: true,
                schema: {
                    username: "Usernameeample",
                    address: "0xdB055877e6c13b6A6B25aBcAA29B393777dD0a73"
                }
            }
      */
    datasource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        address: req.body.address,
        name: req.body.username,
        iscoach: true
      })
      .execute();
    res.send('Success');
  }
);

router.get('/getusername', async (req: Request, res: Response) => {
  /*      #swagger.auto = false
            #swagger.path = '/users/getusername'
            #swagger.method = 'get'
            #swagger.description = 'API endpoint to get a username given an ethereum address.'
            #swagger.parameters['address'] = {
                in: 'path',
                description: 'Ethereum address of wallet requesting.',
                required: true
            }
      */
  const newUser: User = await datasource
    .getRepository(User)
    .createQueryBuilder()
    .where('address = :address', { address: req.query.address })
    .getOne();
  res.send(newUser.name);
});

router.get(
  '/getcontractaddress',
  (req: Request, res: Response, next: NextFunction) => {
    // solve this through github secret/env variable
    // let addy = fs.readFileSync("address.txt");
    // res.send(addy);
    // Wont be possible with env variables because cant access env variables with react frontend
  }
);

export default router;
