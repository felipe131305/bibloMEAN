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
    dbStatus: true,
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

const listUserAdmin = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  return users.length === 0
    ? res.status(400).send({ message: "No search resulst" })
    : res.status(200).send({ users });
};

const listUser = async (req, res) => {
  let users = await user
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }],
    })
    .populate("role")
    .exec();
  if (users.length === 0)
    return res.status(400).send({ message: "No serach results" });
  return res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await user.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });
  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "user no found" });
  const passHash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!passHash)
    return res.status(400).send({ message: "Wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          age: userLogin.age,
          role: userLogin.role,
          phone: userLogin.phone,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (error) {
    return res.status(500).send({ message: " Register Error" });
  }
};

const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });
  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });
  return !users
    ? res.status(500).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted successfully" });
};

const updateUser = async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.age ||
    !req.body.email ||
    !req.body.role ||
    !req.body.document ||
    !req.body.phone
  )
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";
  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }
  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    age: req.body.age,
    role: req.body.role,
    document: req.body.document,
    phone: req.body.phone,
    password: pass,
  });
  if (!editUser) return res.status(500).send({ message: "Error update user" });
  return res.status(200).send({ message: "User update" });
};

export default { registerUser, listUser, login, deleteUser, updateUser,listUserAdmin };
