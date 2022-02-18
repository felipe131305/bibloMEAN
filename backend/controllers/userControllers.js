import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.age ||
    !req.body.phone ||
    !req.body.document ||
    !req.body.password
  )
    return res.status(400).send({ message: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new user({
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    email: req.body.email,
    document: req.body.document,
    password: passHash,
    role: req.body.role,
    dnStatus: true,
  });

  const result = await userSchema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register user" });
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          phone: result.phone,
          email: result.email,
          document: result.document,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (error) {
    return res.status(500).send({ message: "Register error" });
  }
};

const listUser = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  return users.length === 0
    ? res.status(400).send({ message: "No search resulst" })
    : res.status(200).send({ users });
};

export default { registerUser, listUser};
