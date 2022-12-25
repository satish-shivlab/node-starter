const niv = require("node-input-validator")
const UserDB = require("../models/user")
const bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
/**
 *  { [admin, user, teacher ] registration } use
 */

exports.add = async (req, res) => {
  const ObjValidation = new niv.Validator(req.body, {
    first_name: "required",
    email: "required|email",
    password: "required|minLength:6",
    last_name: "required",
  })

  const match = await ObjValidation.check()
  if (!match) {
    return res
      .status(422)
      .json({ message: "Validation error", error: ObjValidation.errors })
  }
  const {
    role,
    first_name,
    last_name,
    middle_name,
    email,
    password,
    college,
    join_date,
  } = req.body
  const checkEmail = await UserDB.findOne({
    email: { $regex: email, $options: "i" },
    flag: { $in: [1, 2] },
  })

  if (checkEmail) {
    return res.status(409).json({ message: "email already exits" })
  }
  //
  const hashPassword = await bcrypt.hash(password, 10)

  const newObj = {}
  newObj.role = role
  newObj.first_name = first_name
  newObj.last_name = last_name
  newObj.middle_name = middle_name
  newObj.email = email
  newObj.college = college
  newObj.password = hashPassword
  newObj.join_date = join_date

  try {
    const result = new UserDB(newObj)
    await result.save()

    return res.status(200).json({
      message: `Register has been register successfully`,
      // result: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: "error occur please try again later",
      error: err.message,
    })
  }
}

//

exports.login = async (req, res) => {
  const ObjValidation = new niv.Validator(req.body, {
    email: "required|email",
    password: "required|minLength:6",
  })

  const match = await ObjValidation.check()
  if (!match) {
    return res
      .status(422)
      .json({ message: "Validation error", error: ObjValidation.errors })
  }
  const { email, password } = req.body

  try {
    const adminCheck = await UserDB.findOne({
      email: { $regex: email, $options: "i" },
      flag: { $in: [1, 2, 4] },
    })
    if (!adminCheck) {
      return res.status(401).json({ message: "Invalid email and password " })
    }
    if (adminCheck.flag === 4) {
      return res.status(401).json({
        message: "Your profile register successfully please wait for approval ",
      })
    }

    const checkPassword = await bcrypt.compare(password, adminCheck.password)
    if (!checkPassword) {
      return res.status(409).json({ message: "Invalid email and password " })
    }
    const token = jwt.sign(
      { email: adminCheck.email, id: adminCheck._id },
      process.env.JWT_KEY
    )

    return res
      .status(200)
      .json({ message: "Auth successfully", token: token, user: adminCheck })
  } catch (err) {
    return res.status(500).json({
      message: "error occur please try again later",
      error: err.message,
    })
  }
}

//
exports.auth = async (req, res) => {
  try {
    const result = await UserDB.findOne({ email: req.userData.email })
    return res
      .status(200)
      .json({ message: "Auth successfully", result: result })
  } catch (err) {
    return res.status(500).json({
      message: "error occurred please try again later",
      error: err.message,
    })
  }
}
