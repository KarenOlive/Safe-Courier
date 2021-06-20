import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const parcelOrderSchema = new Schema({
    RecipientsName: {type: String, required: true},
    Contact: {type: String, required: true},
    Order: {type: String, required: true},
    PickupLocation: {type: String, required: true},
    Destination: {type: String, required: true},
    City: {type: String, required: true},
    status: {type: String, default: "confirmed" },
    dateCreated: {type: Date, default: Date().now },
    presentLocation: {type: String, default: "" },
    Sender:{id:{type: mongoose.Schema.Types.ObjectId,ref: 'users'},
                Fullname: {type: String, ref: 'users'}}
});

    parcelOrderSchema.method('isParcelCreator', function (id) {
        if (this.Sender.id == id) {
        return true;
        } else {
        return false;
        }
    });

    parcelOrderSchema.method('isAdmin', function (Email){
        if("johndoe@mail.com" == Email){
            return true;
        }
        else {
            return false;
        }
    });

    parcelOrderSchema.method('cancelOrder', function(){
        if(this.status != "delivered"){
            return true;
        }
        else{
            return false;
        }
    });


const parcels = mongoose.model('parcels', parcelOrderSchema);
// module.exports = parcels;
export default parcels;