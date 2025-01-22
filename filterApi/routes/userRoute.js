import { Router } from "express";
import { filterUser, getAlluser } from "../controllers/userController.js";

const router = Router();

router.route("/users").get(getAlluser);
router.route("/users/filter").get(filterUser);

export default router;
