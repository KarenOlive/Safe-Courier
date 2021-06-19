import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const parcelOrderSchema = new Schema({
    Fullname: {type: String, required: true},
    Contact: {type: String, required: true},
    Order: {type: String, required: true},
    PickupLocation: {type: String, required: true},
    Destination: {type: String, required: true},
    City: {type: String, required: true}
})

const parcels = mongoose.model('parcels', parcelOrderSchema);
module.exports = parcels;