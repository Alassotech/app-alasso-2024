import { Router } from "express";
import { getAllCourses, getSemData } from "../controllers/course.controller.js";

const router = Router();

router.route("/:courseName/:sem_num").get(getSemData);
router.route("/all").get(getAllCourses);

export default router;
