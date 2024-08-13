const mongoose = require('mongoose');
// Schema

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'user name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, 'phone number is require']
    },
    usertype: {
        type: String,
        required: [true, 'user type is required'],
        default: 'client',
        enum: ['admin', 'client', 'vender', 'deliveryman']
    },
    profile: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdefault-user&psig=AOvVaw29wEM_WpRWPm77zigQcXE-&ust=1704893087877000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCNjho-qz0IMDFQAAAAAdAAAAABAE"
    }
    ,
    answer: {
        type: String,
        required: [true, "Answer is required"],
    },

}, { timestamps: true })


//export
module.exports = mongoose.model('User', userSchema)

