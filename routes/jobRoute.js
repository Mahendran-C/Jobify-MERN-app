import express from "express";
import {
  createJob,
  deleteJob,
  getAllJob,
  updateJob,
  showStats,
} from "../controllers/jobControllers.js";
import testUser from "../middleware/testUser.js";

const router = express.Router();

// router.route('/register').post((req, res)=> res.send('register'))

// router.route('/').post(createJob);
// router.route('/').get(getAllJob);

router.route("/").post(testUser, createJob).get(getAllJob);
router.route("/stats").get(showStats);
router.route("/:id").delete(testUser, deleteJob).put(testUser, updateJob);
// router.route('/update').put(updateJob);

export default router;
