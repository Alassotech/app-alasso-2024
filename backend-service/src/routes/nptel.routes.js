import { Router } from "express";
import { getAllCourseName, getNptelCourse } from "../controllers/nptel.controller.js";

const router = Router();

router.route("/all").get(getAllCourseName);
router.route("/:id").get(getNptelCourse);

export default router;
