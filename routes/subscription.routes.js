import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  cancelSubscription,
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscriptionDetails,
  getUserSubscriptions,
  updateSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscriptions);//GET SUBSCRIPTONS

subscriptionRouter.get("/:id",authorize,getSubscriptionDetails);//GET SUBSCRIPTION DETAILS

subscriptionRouter.post("/", authorize, createSubscription);//GUESS WHAT? HAHAHA

subscriptionRouter.put("/:id",authorize,updateSubscription);  //UPDATE SUBSCRIPTION

subscriptionRouter.delete("/:id",authorize,deleteSubscription); //DELETE SUBSCRIPTIOM
 
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions); // GET USER'S SUBSCRIPTIONS

subscriptionRouter.put("/:id/cancel",authorize,cancelSubscription);//CANCEL SUBSCRIPTION

subscriptionRouter.get("/upcoming-renewals", (reg, res) =>  //SHOW UPCOMING RENEWALS
  res.send({ title: "GET upcoming renewals" })
);

export default subscriptionRouter;
