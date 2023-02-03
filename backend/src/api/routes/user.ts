import express, { NextFunction, Request, Response, Router } from 'express';
import { datasource } from '../../db/connection';
import { User } from '../../db/entities/user.entity';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const router: Router = express.Router();

router.post('/register', async (req, res) => {
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
                    address: "0xdB055877e6c13b6A6B25aBcAA29B393777dD0a73",
                    password: "examplep4ssw0rd"
                }
            }
      */
  const pw = await bcrypt.hash(req.body.password, saltRounds);
  datasource
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      address: req.body.address,
      name: req.body.username,
      iscoach: false,
      password: pw
    })
    .execute();

  res.send('Success');
});

router.post(
  '/registercoach',
  async (req: Request, res: Response, next: NextFunction) => {
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
                    address: "0xdB055877e6c13b6A6B25aBcAA29B393777dD0a73",
                    password: "examplep4ssw0rd"
                }
            }
      */
    const pw = await bcrypt.hash(req.body.password, saltRounds);

    datasource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        address: req.body.address,
        name: req.body.username,
        iscoach: true,
        password: pw
      })
      .execute();
    res.send('Success');
  }
);

router.get('/getusername', async (req: Request, res: Response) => {
  /*      #swagger.auto = false
            #swagger.method = 'get'
            #swagger.description = 'API endpoint to get a username given an ethereum address.'
            #swagger.parameters['address'] = {
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

export default router;
