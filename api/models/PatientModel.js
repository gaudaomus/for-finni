const mongoose = require("mongoose");
const { AddressSchema } = require("./AddressModel")

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
    addresses: [
      {
        type: AddressSchema,
        required: true,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false,
      },
    ],
  },
);

module.exports = mongoose.model("Patient", PatientSchema);
