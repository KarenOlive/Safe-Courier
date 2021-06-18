const {v4 : uuidv4} = require('uuid')

const users = []

exports.createUser = async (req, res)=>{
    try{
        const user = req.body
        users.push({ ...user, userId: uuidv4()})
        res.status(200).send(`Parcel order ID ${user.userId} has been created.`)
        console.log(user)
    }
    catch(err){
        res.status(400).json({
            message: "Failed to create user"
        })
        console.log(err)
    }
}