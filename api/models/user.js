const mongoose = require("mongoose")
const aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    role: {
      type: Number,
      enum: [1, 2, 3], // @role [1 = admin 2 = user]
      default: 1,
    },
    flag: {
      type: Number,
      default: 1,
      enum: [1, 2, 3], // @ 1 Activated 2 deactivated 3 Delete 4 New User
    },
  },
  {
    timestamps: true,
  }
)
userSchema.plugin(aggregatePaginate)

module.exports = mongoose.model("user", userSchema)
