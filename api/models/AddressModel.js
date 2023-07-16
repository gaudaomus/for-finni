const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  }
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = {Address, AddressSchema};
