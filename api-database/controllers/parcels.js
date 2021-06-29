import users from "../models/usersSchema.js";
import parcels from "../models/parcelOrderSchema.js";

export const create_Parcel = async (req, res)=>{


    const user = await users.findById({_id : req.userData.userId})

    const newParcel = new parcels({
        RecipientsName: req.body.RecipientsName, 
        Contact : req.body.Contact,
        Order : req.body.Order,
        PickupLocation : req.body.PickupLocation,
        Destination : req.body.Destination,
        City : req.body.City,
        dateCreated: req.body.dateCreated,
        Sender : {id: user._id, Fullname: user.Fullname}
    })

    await newParcel.save()
    .then((createdParcel)=>{
        res.status(200).json({
            createdParcel,
            message : "your parcel order has been created"
        })
        console.log('parcel order created')
    })
    .catch((err)=>{
        res.json({
            message : "Failed to create parcel order"
        })
        console.log(err)
    });
}

export const change_Destination = async (req, res) =>{
    const parcelId = req.params.parcelId;
       

        try{
            if(parcels.isParcelCreator(req.userData.userId)){
                await parcels.updateOne( { _id: parcelId },
                   { $set: { "Destination": req.body.Destination } }
                )
                
                const parcel = await parcels.findById(parcelId);
                if (!parcel) {
                    return res
                  .status(404)
                  .send(`No question with id: ${parcelId} 🤗`);
                   return res.status(200).send(parcel)

                }
            }
            else{
                return res
                .status(401)
                .send(`Access denied not authorised to change details of this order`);
            }
        }
        catch(err){
            res.json({
            message : "Failed to update destination"
        })
        console.log(err)
        }

    }
   

}


export const change_Status = async (req, res) =>{
    const parcelId = req.params.parcelId;
    try{
        const parcel = await parcels.findById(parcelId);
        if (!parcel) {
            return res
            .status(404)
            .send(`No question with id: ${parcelId} 🤗`);
        }

        try{
            if(parcel.isAdmin(req.userData.Email)){
                await parcel.updateOne(
                { $set: { "status": req.body.status } }
                )
                return res.status(200).send(parcel)

            }
            else{
                return res
                .status(401)
                .send(`Access denied not authorised to change status of this order`);
            }
        }
        catch(err){
            
            console.log(err)

        }
    }
    catch(err){
        res.json({
            message : "Failed to update status"
        })
        console.log(err)
    }
}


export const change_present_location = async (req, res)=>{
    try{
        const parcelId = req.params.parcelId;
        const parcel = await parcels.findById(parcelId);
        if (!parcel) {
            return res
            .status(404)
            .send(`No question with id: ${parcelId} 🤗`);
        }

        try{
            if(parcel.isAdmin(req.userData.Email)){
                await parcel.updateOne(
                    { $set: { "presentLocation": req.body.presentLocation } }
                    )
                    return res.status(200).send(parcel)
            }
            else{
                return res
                .status(401)
                .send(`Access denied not authorised to change status of this order`);
            }
        }
        catch(err){
            
            console.log(err)

        }

    }
    catch(err){
        res.json({
            message : "Failed to update present Location"
        })
        console.log(err)
    }
}

export const your_parcel_orders = async (req, res) =>{
    try {
        const myParcels = await parcels.find({'Sender.id': req.userData.userId})
        if (!myParcels) {
          return res.status(400).send(`You haven't made any parcel orders.`)
        }
        res.send(myParcels)
    } 
    catch (error) {
        console.error(error);
        res.status(500).send(`Failed to retrieve user parcel orders.`);
      }
}


export const get_all_parcelOrders = async (req, res)=>{
    try{
        
       const parcelOrders = await parcels.find()
    //    try{
    //         if(parcelOrders.isAdmin(req.userData.Email)){
                
    //                 res.status(200).json({
    //                     count: parcelOrders.length,
    //                     parcelOrders,
    //                     message : "All parcels orders"
    //                 })
    //         }
    //         else{
    //             return res
    //             .status(401)
    //             .send(`Access denied not authorised to make this action`);
    //         }
        
    //    }
    //    catch(err){
            
    //         console.log(err)
    //     }
            // if(parcel.isAdmin(req.userData.Email)){
                
            //             res.status(200).json({
            //                 count: parcelOrders.length,
            //                 parcelOrders,
            //                 message : "All parcels orders"
            //             })
            // }
            // else{
            //         return res
            //         .status(401)
            //         .send(`Access denied not authorised to make this action`);
            //    }
        res.status(200).json({
            count: parcelOrders.length,
            parcelOrders,
            message : "All parcels orders"
        })
    }
    catch(err){
        res.json({
            message : "Can not find any parcel orders"
        })
        console.log(err)

    }
     
}


export const get_specific_parcelOrder = async (req, res)=>{
    try{
        const parcel = await parcels.findById(req.params.parcelId)
        if (!parcel) {
            return res
              .status(404)
              .send(`No parcel with id: ${req.params.parcelId} 🤗`);
        }
        res.status(200).json({
            parcel,
            message : "Here's your parcel order"
        })
    }
    
    catch(err){
        
        res.status(404).json({
            message : "Can not find that parcel order"
        })
        console.log(err) 
    }
}


export const cancel_parcelOrder = async (req, res) =>{
    const parcelId = req.params.parcelId;

    try{
        const parcel = await parcels.findById(parcelId);
        if (!parcel) {
            return res
              .status(404)
              .send(`No question with id: ${parcelId} 🤗`);
        }

        try{
            if(parcel.isParcelCreator(req.userData.userId) || parcel.isAdmin(req.userData.Email)){
                if(parcel.cancelOrder()){
                    await parcel.updateOne(
                        { $set: { "status" : "cancelled" } }
                    )
                    return res.status(200).send(parcel)

                }
                else{
                    return res
                    .status(401)
                    .send(`Can't cancel order because it's been delivered`)
                   
                }
                
            }
            else{
                return res
                .status(401)
                .send(`Access denied not authorised to change details of this order`);
            }
        }
        catch(err){
            console.log(err)

        }

    }
    catch(err){
        res.json({
            message : "User Failed to cancel order"
        })
        console.log(err)
    }

}
