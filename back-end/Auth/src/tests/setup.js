const User = require("../model/user")
async function setup() {
    await User.deleteMany({});
    const user = new User({ username: "admin", password: "123" });
    await user.hashPassword();
    await user.save();
}
module.exports = {setup}
