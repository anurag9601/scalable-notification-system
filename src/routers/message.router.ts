import { Router } from "express";
import { protectRoute } from "../middleware/protect.route";
import { handleUserSendEmail } from "../controllers/message.controller";
const messageRouter = Router();

messageRouter.post("/email/:id", protectRoute, handleUserSendEmail);

export default messageRouter;