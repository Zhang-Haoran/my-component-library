const {generateToken} = require("../utils/auth");
const User = require("../model/user");

//user login
async function login(req,res){
    //check if username or password is empty
    if (req.body.username === undefined|| req.body.password === undefined){
        return res.status(400).send({error:"username or password is not defined"})
    }
    const {username, password} = req.body;

    //check if the user is register in database
    const user = await User.findOne({username});
    if (!user){
        return res.status(404).json({error:"username not found"});
    }

    //check if the password is correct
    const validatePassword = await user.validatePassword(password);
    if (!validatePassword){
        return res.status(401).json({error:"invalid password"});
    }

    return res.status(200).json({token: generateToken({id:user._id}), username})
}
module.exports = {login}
