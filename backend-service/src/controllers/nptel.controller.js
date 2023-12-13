import { Nptel } from "../models/nptel.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandler.js";
import NodeCache from "node-cache";
const myCache = new NodeCache();

const getAllCourseName = asyncHandler(async (req, res) => {
    const cachedNptelCourse = myCache.get("cachedNptelCourses");
    if (cachedNptelCourse) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    cachedNptelCourse,
                    "Courses Found (Cached)"
                )
            );
    }
    const courses = await Nptel.find(
        {},
        {
            courseName: 1,
        }
    )
        .lean()
        .exec();

    if (!courses || courses.length === 0) {
        throw new ApiError(404, "No Nptel Courses Found!");
    }
    myCache.set("cachedNptelCourses", courses, 0);
    myCache.set(cachekey, courses, 0);

    return res
        .status(200)
        .json(new ApiResponse(200, courses, "Nptel Courses Found"));
});

const getNptelCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cachekey = `nptel_${id}`;
    const cachedNptelCourse = myCache.get(cachekey);
    if (cachedNptelCourse) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    cachedNptelCourse,
                    "Courses Found (Cached)"
                )
            );
    }
    const assignments = await Nptel.findById(id, {
        courseName: 1,
        assignments: 1,
    })
        .lean()
        .exec();

    if (!assignments || assignments.length === 0) {
        throw new ApiError(404, "No Assignments Found!");
    }

    myCache.set(cachekey, assignments, 0);

    return res
        .status(200)
        .json(new ApiResponse(200, assignments, "Nptel Assignments Found"));
});

export { getNptelCourse, getAllCourseName };
