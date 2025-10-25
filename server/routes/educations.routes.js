import express from "express";
import eduCtrl from "../controllers/educations.controller.js";

const router = express.Router();
router.route("/api/qualifications").post(eduCtrl.create); //route for creating a qualification
router.route("/api/qualifications").get(eduCtrl.list); //route for listing all qualifications
router.param("id", eduCtrl.qualificationByID); //middleware to find qualification by ID, used by the routes that do things by ID
router.route("/api/qualifications/:id").get(eduCtrl.read); //route for reading a qualification by ID
router.route("/api/qualifications/:id").put(eduCtrl.update); //route for updating a qualification by ID
router.route("/api/qualifications/:id").delete(eduCtrl.remove); //route for deleting a qualification by ID
router.route("/api/qualifications").delete(eduCtrl.removeAll); //route for deleting all qualifications

export default router;
