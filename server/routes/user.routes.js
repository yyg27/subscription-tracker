import { Router } from "express";
import { getUser, getUsers, createUser, updateUser, deleteUser, changePassword, deleteMyAccount, getMyProfile, updateMyProfile } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/",getUsers);

userRouter.get("/me", authorize, getMyProfile);
userRouter.put("/me", authorize, updateMyProfile);
userRouter.put("/password", authorize, changePassword);
userRouter.delete("/me", authorize, deleteMyAccount);

userRouter.get("/:id",authorize,getUser); // "/:id" is dynamic paramater 

userRouter.post("/",createUser);

userRouter.put("/:id",authorize,updateUser);

userRouter.delete("/:id",authorize,deleteUser);

export default userRouter; 