import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // to find ALL the users in the database

    res.status(200).json({ succes: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res) => {
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

export const createUser = async (req,res) => {
  try{
    const user = await User.create(req.body);

    res.status(201).json({succes: true, data: user});
  }catch(error){
    next(error);
  }
}

export const updateUser = async (req,res) => {
  try{
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{
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

export const deleteUser = async(req,res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({succes: true, data: {}});
  }catch(error){
    next(error);
  }
}