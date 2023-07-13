const Patient = require("../models/PatientModel");

module.exports.PatientCreate = async (req, res, next) => {
  console.log("Patient Create");
  try {
    const {
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      address,
      comments,
    } = req.body;
    await Patient.create({
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      address,
      comments,
    });
    res
      .status(201)
      .json({ message: "Patient created successfully", success: true });
  } catch (error) {
    console.error(error);
  }
};

module.exports.PatientList = async (req, res, next) => {
  try {
    const patientList = await Patient.find({}, "-address -comments");
    res.send(patientList);
  } catch (error) {
    console.error(error);
  }
};

module.exports.PatientDetail = async (req, res, next) => {
  try {
    const patientDetail = await Patient.findById(req.params.id);
    res.send(patientDetail);
  } catch (error) {
    console.error(error);
  }
};
