const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'County and State API',
    description: 'API for managing counties and states'
  },
  tags: [
    {name: 'County', description: 'County CRUD operations'},
    {name: 'State', description: 'State CRUD operations'}
  ],
  host: process.env.SWAGGER_HOST || 'https://cse341-project2-xao6.onrender.com',
  schemes: process.env.SWAGGER_HOST ? ['https'] : ['http'],
  basePath: ''
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
