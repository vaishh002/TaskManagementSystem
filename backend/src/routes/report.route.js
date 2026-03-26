import { Router } from "express";
import { submitReport, getReportsByTask } from "../controllers/report.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/submit").post(submitReport);
router.route("/task/:taskId").get(getReportsByTask);

export default router;
