import mongoose from "mongoose";

const Schema = mongoose.Schema

const UserSchema  = new Schema ({
    firstname:{
        type:String,
        required: true,
    },
    lastname:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
    },
    cartData:{
        type:Object,
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("Users", UserSchema);