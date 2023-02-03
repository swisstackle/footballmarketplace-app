const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Footballmarketplace',
    description: 'RestAPI of the football marketplace'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/api/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
