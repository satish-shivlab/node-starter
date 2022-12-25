require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const ConnectDB = require("./api/config/dbs")

//
const userRoute = require("./api/route/user")
const productRoute = require("./api/route/product")
//
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/upload", express.static("upload"))
ConnectDB()
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE")
    return res.status(200).json({})
  }
  next()
})

app.use("/api/v1/user", userRoute)
app.use("/api/v1/product", productRoute)
// app.use('/api/college', collegeRoute)
// app.use('/api/certificate', certificateRoute)

app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    message: error.message,
  })
})

module.exports = app
