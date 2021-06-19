import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    Fullname: {type: String, required: true},
    Email: {type: String, unique: true, required: true},
    Password: {type: String, required: true}
})

const users = mongoose.model('users', usersSchema);

module.exports = users;