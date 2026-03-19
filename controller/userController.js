import User from "../model/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/apiResponse.js";

export const getAllUsers = asyncHandler(async (req, res) => {

  let {
    page = 1,
    limit = 5,
    search = "",
    role,
    sort = "desc",
  } = req.query;

  const pageNumber = Math.max(1, parseInt(page) || 1);
  const limitNumber = Math.min(50, parseInt(limit) || 5); // max 50
  const skip = (pageNumber - 1) * limitNumber;

  let filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (role) {
    filter.role = role;
  }

  const sortOption = {
    createdAt: sort === "asc" ? 1 : -1,
  };

  const totalRecords = await User.countDocuments(filter);

  const users = await User.find(filter)
    .select("-password") 
    .sort(sortOption)
    .skip(skip)
    .limit(limitNumber);

  sendResponse(res, 200, "Users fetched successfully", {
    totalRecords,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalRecords / limitNumber),
    users,
  });

});