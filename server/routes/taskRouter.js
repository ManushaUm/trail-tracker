import express from "express";
import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
  duplicateTask,
  getTask,
  getTasks,
  postTaskActivity,
  trashTask,
  updateTask,
} from "../controllers/taskController.js";
import { isAdminRoute, authUserRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authUserRoute, isAdminRoute, createTask);
router.post("/duplicate/:id", authUserRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", authUserRoute, postTaskActivity);

router.get("/dashboard", authUserRoute, dashboardStatistics);
router.get("/", authUserRoute, getTasks);
router.get("/:id", authUserRoute, getTask);

router.put("/create-subtask/:id", authUserRoute, isAdminRoute, createSubTask);
router.put("/update/:id", authUserRoute, isAdminRoute, updateTask);
router.put("/:id", authUserRoute, isAdminRoute, trashTask);

router.delete(
  "/delete-restore/:id?",
  authUserRoute,
  isAdminRoute,
  deleteRestoreTask
);

export default router;
