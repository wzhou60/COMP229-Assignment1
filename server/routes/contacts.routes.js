import express from "express";
import contactCtrl from "../controllers/contacts.controller.js";

const router = express.Router();
router.route("/api/contacts").post(contactCtrl.create); //route for creating a contact
router.route("/api/contacts").get(contactCtrl.list); //route for listing all contacts
router.param("id", contactCtrl.contactByID); //middleware to find contact by ID, used by the routes that do things by ID
router.route("/api/contacts/:id").get(contactCtrl.read); //route for reading a contact by ID
router.route("/api/contacts/:id").put(contactCtrl.update); //route for updating a contact by ID
router.route("/api/contacts/:id").delete(contactCtrl.remove); //route for deleting a contact by ID
router.route("/api/contacts").delete(contactCtrl.removeAll); //route for deleting all contacts

export default router;
