import Student from "../model/studentModel.js";

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
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