const express = require("express");
const {
  PatientCreate,
  PatientList,
  PatientDetail,
  PatientDetailDelete,
  PatientDetailUpdate,
} = require("../controllers/PatientController");
const router = express.Router();

router.post("/create", PatientCreate);
router.get("/list", PatientList);
router.delete("/:id/delete", PatientDetailDelete);
router.post("/:id/update", PatientDetailUpdate)
router.get("/:id", PatientDetail);

module.exports = router;
