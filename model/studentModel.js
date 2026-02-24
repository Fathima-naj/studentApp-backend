import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required:true
},
  name: { type: String, required: true },
  email:{type:String,required:true},
  course: { type: String, required: true },
}, { timestamps: true });

const Student= mongoose.model("Student", studentSchema);
export default Student;