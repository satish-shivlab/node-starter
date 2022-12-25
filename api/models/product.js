const mongoose = require("mongoose")
const aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
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
productSchema.plugin(aggregatePaginate)

module.exports = mongoose.model("product", productSchema)
