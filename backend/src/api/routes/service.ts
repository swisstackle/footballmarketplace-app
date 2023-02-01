import express from 'express';

const router = express.Router();

router.get('/getAdmittedServices', async (req, res) => {
  // const results = await db.getAdmittedServices(req.query.address);
  // res.send(results);
});

router.get('/getServiceRequests', async (req, res) => {
  // const results = await db.getServices();
  // res.send(results);
});

router.delete('/delete', (req, res) => {
  // db.deleteService(req.query.address,req.query.name);
  // res.send("Success");
});

router.post('/buy', (req, res) => {
  // db.buyService(req.query.servicename, req.query.address);
  // res.send("Success");
});

router.post('/servicedone', (req, res) => {
  // db.serviceDone(req.query.servicename, req.query.address);
  // res.send("Success");
});

router.get('/getallservices', async (req, res) => {
  // const results = await db.getAllServices();
  // res.send(results);
});

router.get('/requestRegisterService', (req, res) => {
  // db.dbRequestRegisterService(req.query.address, req.query.name, req.query.description, req.query.price);
  res.send('Success');
});

router.post('/admitservice', async (req, res) => {
  const serviceName = req.query.name;
  const address = req.query.address;
  const description = req.query.description;
  // db.deleteServiceRequest(address, serviceName);
  // db.submitService(address, serviceName, description, req.query.price);

  res.send('Success');
});

export default router;
