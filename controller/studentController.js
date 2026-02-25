import Student from "../model/studentModel.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const createStudent = async (req, res) => {
  try {
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
      return res.status(400).json({
        message: "Student already exists"
      });
    }
    const student = await Student.create({
      name,
      email,
      course,
      userId: user._id
    });

    res.status(201).json(student);

  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

export const getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};

export const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(student);
};

export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
};


export const getOwnStudentData = async (req, res) => {
  try {
    console.log(req.user)
    const student = await Student.findOne({ userId: req.user._id });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const updateOwnStudent = async (req, res) => {
  try {
    const userId = req.user.id; // from verifyToken middleware

    const { name, email, course, password } = req.body;

    let student = await Student.findOne({ user: userId });

    if (!student) {
      // 🔥 CREATE if not exists
      student = new Student({
        user: userId,
        name,
        email,
        course,
        password,
      });

      await student.save();

      return res.status(201).json({
        message: "Student profile created",
        student,
      });
    }

    // 🔥 UPDATE if exists
    student.name = name || student.name;
    student.email = email || student.email;
    student.course = course || student.course;

    if (password) {
      student.password = password;
    }

    await student.save();

    res.status(200).json({
      message: "Student profile updated",
      student,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};