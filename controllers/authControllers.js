import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} from "../errors/index.js";
import attachCookie from "../utils/attachCookie.js";

// const register = (req, res)=>res.send('register');

const register = async (req, res, next) => {
  // try{

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide valid values");
  }

  console.log(req.body);

  const user = await User.create(req.body);
  const token = user.createJWT();

  attachCookie({res, token});
  res.status(StatusCodes.CREATED).json({
      user: { name: user.name, lastName: user.lastName, email: user.email },
      location: user.location,
    //   token,
    });

  // res.status(201).json({user});
  // }catch(error){
  //     console.log(error);
  //     next(error);
  // }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide valid values");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid Email id");
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new UnauthenticatedError("Invalid password");
  }

  const token = user.createJWT();
  user.password = undefined;
 
  attachCookie({res, token});

  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
    // token,
  });

  // res.send(user);
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Provide all Values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  console.log(user);

  user.name = name;
  user.email = email;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  // res.send(user)

  const token = user.createJWT();
  
  attachCookie({res, token});
  res.status(StatusCodes.OK).json({
    user,
    // token,
    location: user.location,
  });
};

const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json({
      user,
      location: user.location,
    });
}

const logout = async (req, res) => {
    res.cookie('token', 'none', {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(StatusCodes.OK).json({ msg: 'Logged out successfully' });
  };
  

export { register, login, updateUser, getCurrentUser, logout };
