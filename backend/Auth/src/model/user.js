const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

schema.methods.hashPassword = async function(){
    this.password = await bcrypt.hash(this.password,12);
};

schema.methods.validatePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User",schema);
