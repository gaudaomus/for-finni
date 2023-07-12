const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'An username is required'],
    },
    password: {
        type: String,
        required: [true, 'An password is required'],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

UserSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', UserSchema);