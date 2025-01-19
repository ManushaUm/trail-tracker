import express from "express";
import userRouter from "./userRouter.js";
import taskRouter from "./taskRouter.js";

const router = express.Router();

router.use("/users", userRouter); // /api/user/login
router.use("/tasks", taskRouter); // /api/task

export default router;
