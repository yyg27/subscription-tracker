import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflow/subscription/reminder`,
      body: { subscriptionId: subscription._id },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({ success: true, data: subscription }); 
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized!! User's don't match" });
    }
    
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    const subscriptions = await Subscription.find({ user: req.params.id })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ success: true, data: subscriptions, page, limit });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    const allSubscriptions = await Subscription.find()
      .skip((page - 1) * limit)
      .limit(limit);
      
    res.status(200).json({ success: true, data: allSubscriptions, page, limit });
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
     if (!canceledSubs) {
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

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    const upcomingRenewals = await Subscription.find({
      renewalDate: { $gt: new Date() },
    })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ success: true, data: upcomingRenewals, page, limit });
  } catch (error) {
    next(error);
  }
};