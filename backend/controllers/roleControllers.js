import role from "../models/role.js";
import users from "../models/user.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400), send({ message: "Incoplete data" });

  let roleSchema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  let result = await roleSchema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register role" });
  res.status(200).send({ result });
};

const listRole = async (req, res) => {
  let roles = await role.find();
  if (roles.length === 0)
    return res.body(400).send({ message: "No search results" });
  return res.status(200).send({ roles });
};

const deleteRole = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "incomplete data" });

  const roles = await role.findByIdAndDelete(req.params["_id"]);
  return !roles
    ? res.status(400).send({ message: "Error deleting role" })
    : res.status(200).send({ message: "role deleted " });
};

const updateRole = async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body._id)
    return res.status(400).send({ message: "Incomplete data" });
  const editRole = await role.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });
  if (!editRole) return res.status(500).send({ message: "Error update role" });
  return res.status(200).send({ message: "Role update" });
};
export default { registerRole, listRole, deleteRole, updateRole };
