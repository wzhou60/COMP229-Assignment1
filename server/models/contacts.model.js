import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema({
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
});

export default mongoose.model("contacts", ContactSchema); //export to use in other files
