import Contact from "../models/contacts.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

//function to create
const create = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    return res.status(200).json({
      message: "Successfully created a contact!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let contacts = await Contact.find().select(
      "title firstname lastname email completion description"
    );
    res.json(contacts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const contactByID = async (req, res, next, id) => {
  try {
    let contact = await Contact.findById(id);
    if (!contact)
      return res.status(400).json({
        error: "Contact not found",
      });
    req.profile = contact;
    next(); //middleware function that passes control to the next middleware function or route handler
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve contact",
    });
  }
};

//Returns the contact profile with sensitive information (password and salt) removed.
const read = (req, res) => {
  return res.json(req.profile);
};

/*
Updates the contact profile with data from req.body
o Saves the updated contact profile to the database.
o Returns the updated profile, or an error message on failure.
*/
const update = async (req, res) => {
  try {
    let contact = req.profile;
    contact = extend(contact, req.body);
    await contact.save();
    res.json(contact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/*
Deletes the contact profile from the database.
o Returns the deleted contact profile, or an error message on failure.
*/
const remove = async (req, res) => {
  try {
    let contact = req.profile;
    let deletedContact = await contact.deleteOne();
    res.json(deletedContact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  const { confirmation } = req.body;
  console.log(confirmation);
  if (confirmation !== "yes") {
    return res.status(400).json({
      error:
        "Confirmation not provided. To delete all contacts, send 'yes' in the request body for confirmation.",
    });
  }

  try {
    const result = await Contact.deleteMany({});
    res.status(200).json({
      message: `${result.deletedCount} contacts have been deleted successfully.`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, contactByID, read, list, remove, removeAll, update };
