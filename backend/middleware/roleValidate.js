import role from "../models/role.js";

const existingRole = async (req, res, next) => {
  const roleId = await role.findOne({ role: "user" });
  if (!roleId)
    return res.status(500).send({ message: "no role was assingned" });
  req.body.role = roleId._id;
  next();
};

export default { existingRole };
