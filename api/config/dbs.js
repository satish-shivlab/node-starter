const mongoose = require("mongoose")

const ConnectDB = async () => {
  try {
    const res = await mongoose.connect(`${process.env.DB_URL}`)

    console.log("MongoDB connected..")
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = ConnectDB
