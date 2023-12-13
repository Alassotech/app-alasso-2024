import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandler.js";
import NodeCache from "node-cache";
const myCache = new NodeCache();

const getAllCourses = asyncHandler(async (req, res) => {
    const cachedAllCourses = myCache.get("allcourses");
    if (cachedAllCourses) {
        return res
            .status(200)
            .json(
                new ApiResponse(200, cachedAllCourses, "Courses Found (Cached)")
            );
    }

    const courses = await Course.find({}, { courseName: 1 }).lean().exec();

    if (!courses || courses.length == 0) {
        throw new ApiError(404, "No courses found!");
    }
    myCache.set("allcourses", courses, 0);
    return res.status(200).json(new ApiResponse(200, courses, "Courses Found"));
});

const getSemData = asyncHandler(async (req, res) => {
    const { courseName, sem_num } = req.params;

    //to implement caching here.....

    const result = await Course.findOne(
        { courseName, "semester.sem_num": sem_num },
        { courseName: 1, "semester.$": 1 }
    ).exec();

    if (!result || result.length == 0) {
        throw new ApiError(404, "No course matching the semester found!");
    }

    return res.status(200).json(new ApiResponse(200, result, "Subjects Found"));
});

export { getSemData, getAllCourses };
