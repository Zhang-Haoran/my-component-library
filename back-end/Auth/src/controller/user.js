const User = require("../model/user");
const { generateToken } = require("../utils/auth");
//sign up user
async function addUser(req, res) {
  //check if username or password is empty
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .send({ error: "username or password is not defined" });
  }
  const { username, password } = req.body;

  //check if user is already registered
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ error: "user already exist" });
  }
  //create new user in database
  const user = new User({ username, password });
  await user.hashPassword();
  await user.save();
  const token = generateToken({ id: user._id });
  return res.status(201).json({ token, username });
}
module.exports = { addUser };
