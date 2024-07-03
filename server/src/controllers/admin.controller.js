import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CRMUser } from "./../models/user.model.js";


const getAllMembers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query = "" } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);


    const filter = { adminId: req.user._id };
    if (query) {
        filter.$or = [
            { firstName: { $regex: query, $options: "i" } },
            { lastName: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
        ];
    }


    const members = await CRMUser.find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);


    const totalMembers = await CRMUser.countDocuments(filter);


    const paginationInfo = {
        totalItems: totalMembers,
        totalPages: Math.ceil(totalMembers / limitNumber),
        currentPage: pageNumber,
        itemsPerPage: limitNumber,
    };

    // Send response
    return res.status(200).json(new ApiResponse(200, { members, pagination: paginationInfo }, "Employees fetched successfully ✅"));
});

export {
    getAllMembers
};