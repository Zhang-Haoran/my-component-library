const User = require("../model/user");
const {generateToken} = require("../utils/auth");
async function addUser(req,res){
    if (req.body.username === undefined ||req.body.password === undefined ){
        return res.status(400).send({error:"username or password is not defined"})
    }
    const {username,password} = req.body;

    const existingUser = await User.findOne({username});
    if (existingUser){
        return res.status(409).json({error: "user already exist"})
    }
    const user = new User({username,password});
    await user.hashPassword();
    await user.save();
    const token = generateToken({id:user._id});
    return res.status(201).json({token, username});
}
module.exports = {addUser};
