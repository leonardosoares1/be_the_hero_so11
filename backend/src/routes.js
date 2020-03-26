const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const OngIncidentController = require('./controllers/OngIncidentController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.get('/ongs/:id/incidents',  OngIncidentController.index)

routes.get('/ongs',  OngController.index)
routes.post('/ongs',  OngController.store)

routes.get('/incidents',  IncidentController.index)
routes.post('/incidents',  IncidentController.store)
routes.delete('/incidents/:id',  IncidentController.destroy)

routes.post('/sessions',  SessionController.store)


module.exports = routes