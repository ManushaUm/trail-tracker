import User from "../models/user.js";

const authUserRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      throw new Error("Invalid user");
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedToken);

      req.user = await User.findById(decodedToken.userId).select(
        "isAdmin email"
      );

      req.user = {
        email: res.email,
        isAdmin: res.isAdmin,
        userId: decodedToken.userId,
      };
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: false, message: "Not authorized. Try login again." });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

export { isAdminRoute, authUserRoute };
