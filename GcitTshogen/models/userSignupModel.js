import mongoose from 'mongoose';

import passportLocalMongoose from'passport-local-mongoose';



// const userRegistration = new mongoose.Schema({
//     // name: String,
//     username: String,
//     password: String,
//     // conform_password: String

// });
// userRegistration.plugin(passportLocalMongoose);


// const Signup = mongoose.model('Signup', userRegistration)
// export default Signup;

const userShema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        
    },
    resetToken: String,
    resetTokenExpire: Date,

    // confirmpassword: {
    //     type: String,
    //     required: true
    // },
    emailToken: {
        type: String,
    
    },
    isVarified: {
        type:Boolean
    },
    date: {
        type: Date,
        default:Date.now()
    }
    
});
const User = mongoose.model('User',userShema)

export default User;
