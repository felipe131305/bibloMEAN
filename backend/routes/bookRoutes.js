import express from "express"
import bookController from "../controllers/bookController.js";

const router = express.Router();

router.post("/registerBook/:name?",bookController.registerBook)
router.get("/listBook/:name?", bookController.listBook);

export default router;