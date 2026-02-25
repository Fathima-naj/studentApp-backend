import User from "../model/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      search = "",
      role,
      sort = "desc",
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
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
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    res.status(200).json({
      totalRecords,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalRecords / limitNumber),
      users,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};