import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { dbConnection } from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js";
import router from "./routes/index.js";
import Task from "./models/task.js";

dotenv.config();

dbConnection();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: ["https://trail-tracker-client.vercel.app/"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/tasks", (req, res) => {
  Task.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.get("/task/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL
  console.log(req.params); // Logs the ID to the console for debugging
  try {
    const task = await Task.findById(id); // Use the ID to fetch the task
    if (!task) {
      return res.status(404).json({ message: "Task not found" }); // Handle case where no task is found
    }
    res.json(task); // Return the task as a JSON response
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: "Server error" }); // Handle server errors
  }
});

app.post("/tasks/create", async (req, res) => {
  try {
    console.log(req.body);

    //validate the req
    if (!req.body.title) {
      return res.status(400).json({ message: "Invalid request" });
    }

    //destructure the request body
    const { title, description, stage, priority, date } = req.body;

    const task = await Task.create({
      title,
      description,
      stage,
      priority,
      date,
    });

    console.log("Task created:", task);

    res.status(201).json(task);
  } catch (error) {
    console.error("Error in /create route:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
