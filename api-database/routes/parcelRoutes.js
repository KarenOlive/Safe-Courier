import express from 'express';
export const parcelRoutes = express.Router();

import { create_Parcel, change_Destination, change_Status, change_present_location, your_parcel_orders, get_all_parcelOrders, get_specific_parcelOrder, cancel_parcelOrder } from '../controllers/parcels.js';
import { checkAuth } from '../middleware/check-auth.js';

parcelRoutes.post('/parcels', checkAuth, create_Parcel);

parcelRoutes.put('/parcels/:parcelId/destination', checkAuth, change_Destination);

parcelRoutes.put('/parcels/:parcelId/status', checkAuth, change_Status);

parcelRoutes.put('/parcels/:parcelId/presentLocation', checkAuth, change_present_location);

parcelRoutes.get('/users/:userId/parcels', checkAuth, your_parcel_orders);

parcelRoutes.get('/parcels', checkAuth, get_all_parcelOrders);

parcelRoutes.get('/parcels/:parcelId', checkAuth, get_specific_parcelOrder);

parcelRoutes.put('/parcels/:parcelId/cancel', checkAuth, cancel_parcelOrder);
