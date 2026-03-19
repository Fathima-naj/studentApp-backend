import Student from "../model/studentModel.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

import asyncHandler from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/apiResponse.js";

export const createStudent = asyncHandler(async (req, res) => {

  const { name, email, course } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash("default123", 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });
  }

  const existingStudent = await Student.findOne({ userId: user._id });

  if (existingStudent) {
    const error = new Error("Student already exists");
    error.statusCode = 400;
    throw error;
  }

  const student = await Student.create({
    name,
    email,
    course,
    userId: user._id
  });

  sendResponse(res, 201, "Student created successfully", student);

});


export const getStudents = asyncHandler(async (req, res) => {

  const students = await Student.find();

  sendResponse(res, 200, "Students fetched successfully", students);

});


export const getStudent = asyncHandler(async (req, res) => {

  const student = await Student.findById(req.params.id);

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  sendResponse(res, 200, "Student fetched successfully", student);

});


export const updateStudent = asyncHandler(async (req, res) => {

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  sendResponse(res, 200, "Student updated successfully", student);

});


export const deleteStudent = asyncHandler(async (req, res) => {

  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  sendResponse(res, 200, "Student deleted successfully");

});


export const getOwnStudentData = asyncHandler(async (req, res) => {

  const student = await Student.findOne({ userId: req.user._id });

  if (!student) {
    return sendResponse(res, 200, "No student data found", null);
  }

  sendResponse(res, 200, "Student data fetched", student);

});


export const updateOwnStudent = asyncHandler(async (req, res) => {

  const userId = req.user.id;

  const { name, email, course, password } = req.body || {};

  let student = await Student.findOne({ userId });

  if (!student) {
    student = new Student({
      userId,
      name,
      email,
      course,
      profileImage: req.file?.path || "",
    });

    await student.save();

  } else {
    student.name = name || student.name;
    student.email = email || student.email;
    student.course = course || student.course;

    if (req.file) {
      student.profileImage = req.file.path;
    }

    await student.save();
  }

  if (password && password.trim() !== "") {

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
  }

  sendResponse(res, 200, "Profile updated successfully", student);

});