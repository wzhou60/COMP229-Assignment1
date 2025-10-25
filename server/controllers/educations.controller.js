import Qualification from "../models/educations.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

//function to create
const create = async (req, res) => {
  const qualification = new Qualification(req.body);
  try {
    await qualification.save();
    return res.status(200).json({
      message: "Successfully created a qualification!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let qualifications = await Qualification.find().select(
      "title firstname lastname email completion description"
    );
    res.json(qualifications);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const qualificationByID = async (req, res, next, id) => {
  try {
    let qualification = await Qualification.findById(id);
    if (!qualification)
      return res.status(400).json({
        error: "Qualification not found",
      });
    req.profile = qualification;
    next(); //middleware function that passes control to the next middleware function or route handler
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve qualification",
    });
  }
};

//Returns the qualification profile with sensitive information (password and salt) removed.
const read = (req, res) => {
  return res.json(req.profile);
};

/*
Updates the qualification profile with data from req.body
o Saves the updated qualification profile to the database.
o Returns the updated profile, or an error message on failure.
*/
const update = async (req, res) => {
  try {
    let qualification = req.profile;
    qualification = extend(qualification, req.body);
    await qualification.save();
    res.json(qualification);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/*
Deletes the qualification profile from the database.
o Returns the deleted qualification profile, or an error message on failure.
*/
const remove = async (req, res) => {
  try {
    let qualification = req.profile;
    let deletedQualification = await qualification.deleteOne();
    res.json(deletedQualification);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    res.status(200).json({
      message: `${result.deletedCount} qualifications have been deleted successfully.`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, qualificationByID, read, list, remove, removeAll, update };
