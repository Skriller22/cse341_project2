const express = require('express');
const router = express.Router();
const countyController = require('../controllers/county.controller');
const { validateCountyData, validateCountyUpdateData } = require('../middleware/county.validate');
const stateController = require('../controllers/state.controller');
const { validateStateData, validateStateUpdateData } = require('../middleware/state.validate');
const { validateId } = require('../middleware/validateDB');

// Init swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
router.use('/api-docs', (req, _res, next) => {
    req.swaggerDoc = {
        ...swaggerDocument,
        host: req.get('host'),
        schemes: [req.protocol]
    };
    next();
}, swaggerUi.serveFiles(swaggerDocument), swaggerUi.setup());

// County routes
router.get('/county', /* #swagger.tags = ['County'] */ countyController.getAll);
router.get('/county/:id', /* #swagger.tags = ['County'] */ validateId, countyController.getById);
router.post('/county', /* #swagger.tags = ['County'] */ validateCountyData, countyController.createCounty);
router.put('/county/:id', /* #swagger.tags = ['County'] */ validateId, validateCountyUpdateData, countyController.updateCounty);
router.delete('/county/:id', /* #swagger.tags = ['County'] */ validateId, countyController.deleteCounty);


// State routes
router.get('/state',  /* #swagger.tags = ['State'] */ stateController.getAll);
router.get('/state/:id', /* #swagger.tags = ['State'] */ validateId, stateController.getById);
router.post('/state', /* #swagger.tags = ['State'] */ validateStateData, stateController.createState);
router.put('/state/:id', /* #swagger.tags = ['State'] */ validateId, validateStateUpdateData, stateController.updateState);
router.delete('/state/:id', /* #swagger.tags = ['State'] */ validateId, stateController.deleteState);

module.exports = router;
