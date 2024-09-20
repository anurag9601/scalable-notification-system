import { Router } from "express";
import { handleUserSignup } from "../controllers/user.controles";
const userRouter = Router();

userRouter.post("/signup", handleUserSignup);

export default userRouter;