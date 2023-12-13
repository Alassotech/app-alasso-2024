import { File } from "../models/files.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandler.js";

const getFilesBySubject = asyncHandler(async (req, res) => {
    const { subject } = req.params;

    const files = await File.find(
        { subject },
        {
            title: 1,
            unit: 1,
            file_category: 1,
            link: 1,
            file_path: 1,
            file_mimetype: 1,
            createdAt: 1,
        }
    );

    if (!files || files.length === 0) {
        throw new ApiError(400, "No Data Found for this subject");
    }

    return res.status(200).json(new ApiResponse(200, files, "Files Found"));
});

const getFilesBySubjectAndUnit = asyncHandler(async (req, res) => {
    const { subject, unit } = req.params;

    const files = await File.find(
        { subject, unit },
        {
            title: 1,
            unit: 1,
            file_category: 1,
            link: 1,
            file_path: 1,
            file_mimetype: 1,
            createdAt: 1,
        }
    );
    if (!files || files.length === 0) {
        throw new ApiError(400, "No Data Found for this subject adn unit");
    }

    return res.status(200).json(new ApiResponse(200, files, "Files Found"));
});

const getNotesBySubject = asyncHandler(async (req, res) => {
    const { subject } = req.params;
    const files = await File.find(
        { subject, file_category: "notes" },
        {
            title: 1,
            unit: 1,
            file_category: 1,
            link: 1,
            file_path: 1,
            file_mimetype: 1,
            createdAt: 1,
        }
    );
    if (!files || files.length === 0) {
        throw new ApiError(400, "No Data Found for this subject adn unit");
    }

    return res.status(200).json(new ApiResponse(200, files, "Files Found"));
});

export { getFilesBySubject, getFilesBySubjectAndUnit, getNotesBySubject };
