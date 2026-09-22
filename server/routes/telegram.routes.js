import { Router } from "express";
import { handleWebhook } from "../controllers/telegram.controller.js";

const telegramRouter = Router();

telegramRouter.post("/webhook", handleWebhook);

export default telegramRouter;
