import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";
import { application } from "express";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger(
      { url, body, headers, workflowRunId, retries },
      {
        url: `${SERVER_URL}/api/v1/workflow/subscription/reminder`,
        body: { subscriptionId: subscription._id },
        headers: {
          "content-type": application / json,
        },
        retries: 0,
      }
    );

    res.status(201).json({ succes: true, data: subscription }); //if the user is authorized we validate the request
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    //checks if the user ID in the request is the same as the user ID in the token

    console.log(req.user._id, req.params.id); //check if there is a match

    if (req.user._id.toString() !== req.params.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized!! User's don't match" });
    }
    //find all subscriptions that belong to the user's ID
    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const allSubscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: allSubscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    if (subscription.user.toString() !== req.user._id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized! Acces Denied" });
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};
//---
export const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSubscription = req.body;

    const updateSubs = await Subscription.findByIdAndUpdate(
      id,
      updatedSubscription,
      { new: true }
    );

    if (!updateSubs) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    res.status(200).json({ succes: true, data: updateSubs });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req,res,next) => {
  try{
    const { id } = req.params;

    const deleteSubs = await Subscription.findByIdAndDelete(id);

    if(!deleteSubs){
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    //data is an empty object because we are not returning any data
    res.status(200).json({ success: true, data: {} });

  }catch(error){
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try{
    const {id} = req.params; 
    //we updated the subscription's status to cancelled
    const canceledSubs = await Subscription.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );

     // If subscription not found, return a 404 error
     if (!canceledSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({
      message: "Subscription canceled successfully",
      subscription: canceledSubs,
    });

  }catch(error){
    next(error);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {};