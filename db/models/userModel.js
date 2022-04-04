const mongoose = require('mongoose');

const userSchema = mongoose.Schema (
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
    password: {
      type: String,
      required: true
    }
    trackedPlayers: {
      type: Array,
      required: true,
      default: ['2544', '203507', '201939', '203999', '201142', '203954', '1629029']
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User;