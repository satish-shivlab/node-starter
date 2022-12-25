const { default: mongoose } = require("mongoose")
const niv = require("node-input-validator")
const ProductDB = require("../models/product")
exports.add = async (req, res) => {
  const ObjValidation = new niv.Validator(req.body, {
    title: "required",
    category: "required",
    description: "required",
  })
  if (!req.file) {
    return res.status(422).json({
      message: "Validation error",
      product_image: {
        message: "Product field is required",
        role: "required",
      },
    })
  }

  try {
    const match = await ObjValidation.check()
    if (!match) {
      return res
        .status(422)
        .json({ message: "Validation error", error: ObjValidation.errors })
    }
    const { title, category, description } = req.body
    const newObj = {}
    newObj.title = title
    newObj.category = category
    newObj.description = description
    if (req.file) {
      newObj.product_image = `${req.file.destination}${req.file.filename}`
    }
    const result = new ProductDB(newObj)
    await result.save()
    return res
      .status(201)
      .json({ message: "Product has been added successfully", result })
  } catch (err) {
    return res.status(500).json({
      message: "error occur please try again later",
      error: err.message,
    })
  }
}
exports.getAll = async (req, res) => {
  try {
    let result = await ProductDB.find().sort({ createdAt: -1 })

    for (let i = 0; i < result.length; i++) {
      const element = result[i]
      element.product_image = `${process.env.URL}${element.product_image}`
    }
    return res.status(200).json({
      message: "Product has been retrieved",
      result: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: "error occur please try again later",
      error: err.message,
    })
  }
}

exports.detail = async (req, res) => {
  const { id } = req.params
  try {
    const result = await ProductDB.findOne({
      _id: mongoose.Types.ObjectId(id),
      flag: 1,
    })
    return res.status(200).json({
      message: "Product has been retrieved",
      result: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: "error occur please try again later",
      error: err.message,
    })
  }
}

exports.update = async (req, res) => {
  const { id } = req.params
  try {
    const { title, category, description } = req.body
    const newObj = {}
    newObj.title = title
    newObj.category = category
    newObj.description = description
    if (req.file) {
      newObj.product_image = `${req.file.destination}${req.file.filename}`
    }
    const result = await ProductDB.findOneAndUpdate(
      id,
      { $set: newObj },
      { new: true }
    )
    return res.status(202).json({
      message: "Product has been updated successfully",
      result: result,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "error occur please try again later",
      error: err.message,
    })
  }
}
