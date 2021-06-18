// import { v4 as uuidv4} from "uuid";
const {v4 : uuidv4} = require('uuid')
//Array of parcels
const parcels = [];

//Get all parcels
exports.getParcels = (req, res)=>{
    if(parcels.length != 0){
        res.status(200).json({parcelOrders: parcels})
    }
    else{
        res.status(404).send("No parcel orders found");
    }
}

//Get a specific parcel order
exports.getParcel = async (req, res)=>{
    try{
        const {parcelId} = req.params
        const foundParcel = await parcels.find((parcel) => parcel.parcelId === parcelId)
        res.status(200).json({parcelFound: foundParcel})
    }
    catch(err){
        res.status(404).send('Parcel order not found')

        console.log(err) 

    }


}

//Create a parcel order
exports.createParcel = async (req,res) =>{
    try{
        const parcel = req.body
        // parcels.push({ ...parcel, parcelId: uuidv4(), userId: req.userData.userId, status: req.body.status })
      parcels.push({ ...parcel, parcelId: uuidv4(), status: req.body.status })
        res.status(200).send(`Parcel order ID ${parcel.parcelId} has been created.`)
        console.log(parcel)
    }
    catch(err){
        res.status(400).json({
            message: "Failed to post parcel order"
        })
        console.log(err)
    }
}

//Cancel a parcel order
exports.cancelParcel = async (req, res)=>{
    try{
        const {parcelId} = req.params

           // const foundParcel = await parcels.find((parcel) => parcel.parcelId === parcelId)

            //Find index of specific object using findIndex method. 
            const parcelIndex = await parcels.findIndex((parcel) => parcel.parcelId === parcelId)  
        
       
        //parcels[parcelIndex].status = 'cancelled';
       // foundParcel.status = 'cancelled';


        

        //the update
        //newParcels[parcelIndex] = {...newParcels[parcelIndex], status: "cancelled"}
         parcels[parcelIndex] = {...parcels[parcelIndex], status: "cancelled"}

         
        res.status(200).json({
            updatedParcel: parcels[parcelIndex]
        })
        console.log("After update: ", parcels[parcelIndex]);
          

        

    }
    catch(err){
        res.status(400).send('Parcel order not cancelled')

        console.log(err)

    }
}

//Get parcels ordered by a specific user

exports.getUsersParcels = async (req, res)=>{
    try{
        const userParcels = await parcels.filter((parcel)=> parcel.userId === req.userData.userId)
        if(userParcels){
            return res.status(200).json({yourParcels: userParcels})
        }
        return res.status(400).send('No parcel orders found')
    }
   catch(err){
       
       console.log(err)
   }
}
