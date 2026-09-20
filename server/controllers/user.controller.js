import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Subscription from "../models/subscription.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ succes: true, data: users, page, limit });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    // to find a specific user in the database
    const user = await User.findById(req.params.id).select("-password"); //.select(-password) to exclude the password from the response

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ succes: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req,res, next) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = await User.create({ ...req.body, password: hashedPassword });

    res.status(201).json({succes: true, data: user});
  }catch(error){
    next(error);
  }
}

export const updateUser = async (req,res, next) => {
  try{
    const updateData = { ...req.body };
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if(!user){
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({succes: true, data: user});

  }catch(error){
    next(error);
  }
}

export const deleteUser = async(req,res, next) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // CASCADE DELETE: Remove user's subscriptions
    await Subscription.deleteMany({ user: req.params.id });

    res.status(200).json({succes: true, data: {}});
  }catch(error){
    next(error);
  }
}

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid old password" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteMyAccount = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    await Subscription.deleteMany({ user: req.user._id });
    res.status(200).json({ success: true, message: "Account deleted" });
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};