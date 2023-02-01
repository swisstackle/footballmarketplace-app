import express from 'express';

const router = express.Router();

router.post('/register/:username/:address', (req, res) => {
  // #swagger.description = 'API endpoint to register a new user in the database.'
  /* #swagger.parameters['parameterName'] = {
        in: <string>,
        description: <string>,
        required: <boolean>,
        type: <string>,
        format: <string>,
        schema: <array>, <object> or <string>
} */
  // db.newPlayer(req.query.username, req.query.address);
  res.send('Success');
});
router.delete('/delete', (req, res) => {
  // db.deletePlayer(req.query.address);
  res.send('Success');
});
router.post('/registercoach', (req, res) => {
  // db.registerCoach(req.query.address, req.query.username);
  // res.send("Success");
});

router.get('/getusername', async (req, res) => {
  // let rows = await db.getUsername(req.query.address);
  // res.send(rows[0]['name']);
});

router.get('/getcontractaddress', (req, res) => {
  // solve this through github secret/env variable
  // let addy = fs.readFileSync("address.txt");
  // res.send(addy);
});

export default router;
