const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {getParcels, getParcel, createParcel, cancelParcel, getUsersParcels} = require( '../controllers/parcels');

router.get('/parcels', getParcels);

router.get('/parcels/:parcelId', getParcel);

router.post('/parcels', createParcel);

router.put('/parcels/:parcelId/cancel', cancelParcel);

router.patch('/parcels/:parcelId/cancel', cancelParcel);


router.get('/users/:userId/parcels', getUsersParcels);

module.exports = router;