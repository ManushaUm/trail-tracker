import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};

export const createJWT = (res, userId) => {
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  // Change sameSite from strict to none when app is deployed
};
