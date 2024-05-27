import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJob,
  deleteJobPost,
  getJobById,
  getJobPosts,
  updateJob,
} from "../controllers/jobController.js";
import checkAccountType from "../middlewares/checkAccountType.js";
const router = express.Router();

// POST JOB
router.post("/upload-job", userAuth, checkAccountType("company"), createJob);

// Update Job
router.post(
  "/update-job/:jobId",
  userAuth,
  checkAccountType("company"),
  updateJob,
);

//getJobPost
router.get("/find-jobs", getJobPosts);
router.get("/get-job-details/:id", getJobById);

// delete JOB
router.post(
  "/delete-job/:id",
  userAuth,
  checkAccountType("company"),
  deleteJobPost,
);

export default router;
