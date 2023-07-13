const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    address: [
      {
        type: String,
        required: true,
      },
    ],
    comments: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PatientSchema.virtual("date_of_birth_formatted").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model("Patient", PatientSchema);
