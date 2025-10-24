import Project from "../models/projects.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    return res.status(200).json({
      message: "Successfully created a project!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let projects = await Project.find().select(
      "title firstname lastname email completion description"
    );
    res.json(projects);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const projectByID = async (req, res, next, id) => {
  try {
    let project = await Project.findById(id);
    if (!project)
      return res.status(400).json({
        error: "Project not found",
      });
    req.profile = project;
    next(); //middleware function that passes control to the next middleware function or route handler
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve project",
    });
  }
};

//Returns the project profile with sensitive information (password and salt) removed.
const read = (req, res) => {
  return res.json(req.profile);
};

/*
Updates the project profile with data from req.body
o Saves the updated project profile to the database.
o Returns the updated profile, or an error message on failure.
*/
const update = async (req, res) => {
  try {
    let project = req.profile;
    project = extend(project, req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/*
Deletes the project profile from the database.
o Returns the deleted project profile, or an error message on failure.
*/
const remove = async (req, res) => {
  try {
    let project = req.profile;
    let deletedProject = await project.deleteOne();
    res.json(deletedProject);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    res.status(200).json({
      message: `${result.deletedCount} projects have been deleted successfully.`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, projectByID, read, list, remove, removeAll, update };
