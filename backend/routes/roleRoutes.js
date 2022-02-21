import express from "express";
import rolController from "../controllers/roleControllers.js";
import rolMidd from "../middleware/roleValidate.js";
const router = express.Router();

// http://localhots:3001/role/api/registerRole
router.post("/registerRole",rolMidd.validateRole ,rolController.registerRole);
router.get("/listRole",rolController.listRole)
router.delete("/delete/:_id", rolController.deleteRole);
router.put("/updateRole", rolController.updateRole);

export default router;