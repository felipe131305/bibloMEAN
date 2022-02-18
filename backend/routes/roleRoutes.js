import express from "express";
import rolController from "../controllers/roleControllers.js";
const router = express.Router();

// http://localhots:3001/role/api/registerRole
router.post("/registerRole", rolController.registerRole);
router.get("/listRole",rolController.listRole)

export default router;