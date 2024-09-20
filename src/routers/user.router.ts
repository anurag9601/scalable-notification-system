import { Router } from "express";
import { handleUserSignup } from "../controllers/user.controles";
import { kafkaAdmin } from "../kafka/admin";
const router = Router();

router.post("/signup", handleUserSignup);

export default router;