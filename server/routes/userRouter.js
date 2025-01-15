import express from "express";
import { isAdminRoute, authUserRoute } from "../middlewares/authMiddleware.js";
import {
  activateUserProfile,
  changeUserPassword,
  deleteUserProfile,
  getNotificationsList,
  getTeamList,
  loginUser,
  logoutUser,
  markNotificationRead,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

//protected + admin routes
router.get("/get-team", authUserRoute, isAdminRoute, getTeamList);
router.get("/notifications", authUserRoute, getNotificationsList);

//protected routes
router.put("/profile", authUserRoute, updateUserProfile);
router.put("/read-noti", authUserRoute, markNotificationRead);
router.put("/change-password", authUserRoute, changeUserPassword);

router
  .route("/:id")
  .put(authUserRoute, isAdminRoute, activateUserProfile)
  .delete(authUserRoute, isAdminRoute, deleteUserProfile);

export default router;
