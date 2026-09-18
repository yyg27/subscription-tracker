//TO PROTECT OUR DATABASE AND OUR ROUTES
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;
    console.log("Authorization Header:", req.headers.authorization);  // <-- ERROR LOG 
    //when you pass a token in the header, it starts with BEARER so we check if it starts with BEARER
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; //split the string and get the second part which is in Bearer <token> format
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET); //verify the token
    console.log("Decoded Token:", decoded); // <-- ERROR LOG

    //check if the user exists in the database

    const userCheck = await User.findById(decoded.userID);
    console.log("User found in DB:", userCheck);

    if (!userCheck) {
      return res.status(401).json({ message: "Unauthorized. User not found" });
    }

    req.user = userCheck; //add the user to the request object
    
    next();

  } catch (error) {
    console.error("JWT Verify Error:", error.message);  // ERROR LOG
    res.status(401).json({ message: "Unauthorized", error: error.message });
    next(error);
  }
};


export default authorize;  