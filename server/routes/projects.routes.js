import express from "express";
import projCtrl from "../controllers/projects.controller.js";

const router = express.Router();
router.route("/api/projects").post(projCtrl.create); //route for creating a project
router.route("/api/projects").get(projCtrl.list); //route for listing all projects
router.param("id", projCtrl.userByID); //middleware to find project by ID, used by the routes that do things by ID
router.route("/api/projects/:id").get(projCtrl.read); //route for reading a project by ID
router.route("/api/projects/:id").put(projCtrl.update); //route for updating a project by ID
router.route("/api/projects/:id").delete(projCtrl.remove); //route for deleting a project by ID
router.route("/api/projects").delete(projCtrl.removeAll); //route for deleting all projects

export default router;
