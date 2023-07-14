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
    res.status(200)
    .send(patientDetail);
  } catch (error) {
    console.error(error);
  }
};

module.exports.PatientDetailUpdate = async (req, res, next) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      address,
      comments,
    } = req.body;
    await Patient.findByIdAndUpdate(req.params.id, {
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      address,
      comments,
      _id: req.params.id,
    });
    res
      .status(200)
      .json({ message: "Patient updated successfully", success: true });
  } catch (error) {
    console.error(error);
  }
};

module.exports.PatientDetailDelete = async (req, res, next) => {
  var { first_name, middle_name, last_name, date_of_birth, address, comments } =
    req.body;
  var patient = new Patient({
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    address,
    comments,
    _id: req.params.id,
  });
  try {
    await Patient.findByIdAndDelete(req.params.id, patient);
    res
      .status(200)
      .json({ message: "Patient deleted successfully", success: true });
  } catch (error) {
    console.error(error);
  }
};
