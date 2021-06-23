const {generateToken} = require("../utils/auth");

function login(req,res){
    console.log(req.body)
    if (req.body.username === undefined ||req.body.password === undefined ){
        return res.status(400).send({error:"username or password is not defined"})
    }
    const {username, password} = req.body;
    /*
    * Find user in user model
    * const user = await User.findOne({username});
    * validation password code here
    * const validatePassword = await user.validatePassword(password)
    * */
    return res.status(200).json({token:generateToken({id:1}),username})
}
module.exports = {login}
