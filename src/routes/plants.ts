import express from 'express'
import * as PlantsController from '../controllers/plant'

const router = express.Router()

// router.get('/', PartnersController.getPartners)
// router.get('/:partnerId', PartnersController.getPartner)

router.post('/addPlant', PlantsController.addPlant)
router.post('/getPlants', PlantsController.getPlant)
router.get('/hello', PlantsController.hello)

export default router
