import { Router } from "express";
import {
    getFilesBySubjectAndUnit,
    getFilesBySubject,
    getNotesBySubject,
} from "../controllers/files.controller.js";
const router = Router();

router.route("/:subject").get(getFilesBySubject);
router.route("/notes/:subject").get(getNotesBySubject);
router.route("/:subject/:unit").get(getFilesBySubjectAndUnit);

export default router;
