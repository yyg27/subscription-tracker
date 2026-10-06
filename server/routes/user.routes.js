import { Router } from "express";
import { changePassword, deleteMyAccount, getMyProfile, updateMyProfile } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/me", authorize, getMyProfile);
userRouter.put("/me", authorize, updateMyProfile);
userRouter.put("/password", authorize, changePassword);
userRouter.delete("/me", authorize, deleteMyAccount);

export default userRouter;
