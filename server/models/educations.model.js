import mongoose from "mongoose";
const EducationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  firstname: {
    type: String,
    trim: true,
    required: "First Name is required",
  },
  lastname: {
    type: String,
    trim: true,
    required: "Last Name is required",
  },

  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },

  completion: {
    type: Date,
  },

  description: {
    type: String,
  },
});

export default mongoose.model("educations", EducationSchema); //export to use in other files
