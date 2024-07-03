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

const editMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    const member = await CRMUser.findById(id);
    if (!member) {
        throw new ApiError(404, "Member not found 🫠", res);
    }

    member.firstName = firstName;
    member.lastName = lastName;


    await member.save();

    res.status(200).json(new ApiResponse(200, member, "Member updated successfully ✅"));
});

const deleteMember = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const member = await CRMUser.findByIdAndDelete(id);
    if (!member) {
        throw new ApiError(404, "Member not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Member deleted successfully ✅"));
});

export {
    getAllMembers,
    deleteMember,
    editMember
};