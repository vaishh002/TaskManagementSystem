
import { Router } from "express";
import { createNewTask, getAllTask, updateTask } from "../controllers/task.controller.js";

const router = Router()

router.route("/new-task").post(createNewTask)

router.route("/get/task/:projectId").get(getAllTask)

router.route("/update/:taskId").patch(updateTask)

export default router;
