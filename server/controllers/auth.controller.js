import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
//req body ===>>> reg.body is an object that contains data from the client (POST request)

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //Create a new user by using req.body
    const { name, email, password } = req.body;
    
    //Check if the user already exists
    const existingUser = await User.findOne({ email }); //refering to User model we created

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409; // 409 means there is a conflict
      throw error;
    }

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10); //Salt generally refers to a random string that is used to hash the password
    //10 is the number of rounds of hashing

    const hashedPassword = await bcrypt.hash(password, salt); //hashing the password

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    ); //we attached a session in case of something goes bad we can rollback the transaction

    const token = jwt.sign({ userID: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    }); //jwtSecret is a secret key that we will use to sign the token

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    // If an error occurs, abort the transaction and end session throw an error
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    //Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404; //not found
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid Password");
      error.statusCode = 401; //Unauthorized
      throw error;
    }

    //create a token if password is true

    const expiry = rememberMe ? "365d" : JWT_EXPIRES_IN;
    const token = jwt.sign({ userID: user._id }, JWT_SECRET, {
      expiresIn: expiry,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

//TODO: Implement the signOut controller function with Blacklist method
export const signOut = async (req, res, next) => {
  try {
    res.status(222).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};


 
import transporter, { accountEmail } from "../config/nodemailer.js";
import { SERVER_URL } from "../config/env.js";

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      // Don't leak if email exists, just return success
      return res.status(200).json({ success: true, message: "If an account exists, a reset email was sent." });
    }

    // Secret is specific to user's current password so the token dies when password changes
    const secret = JWT_SECRET + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "15m" });
    
    const baseUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const resetLink = `${baseUrl}/reset-password?id=${user._id}&token=${token}`;

    const mailOptions = {
      from: accountEmail,
      to: user.email,
      subject: "Password Reset Request",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
        <h2>Password Reset</h2>
        <p>You requested a password reset. Click the button below to set a new password. This link expires in 15 minutes.</p>
        <a href="${resetLink}" style="display:inline-block;background:#9ef54c;color:#000;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;">Reset Password</a>
        <p style="color:#666;font-size:12px;margin-top:20px;">If you didn't request this, you can safely ignore this email.</p>
      </div>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "If an account exists, a reset email was sent." });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { id, token, newPassword } = req.body;
    const user = await User.findById(id);
    if (!user) throw new Error("Invalid or expired reset token");

    const secret = JWT_SECRET + user.password;
    try {
      jwt.verify(token, secret);
    } catch (err) {
      throw new Error("Invalid or expired reset token");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
