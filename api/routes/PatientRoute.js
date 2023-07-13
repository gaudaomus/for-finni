const express = require("express");
const {
  PatientCreate,
  PatientList,
  PatientDetail,
} = require("../controllers/PatientController");
const router = express.Router();

router.post("/create", PatientCreate);
router.get("/list", PatientList);
router.get("/:id", PatientDetail);

module.exports = router;
