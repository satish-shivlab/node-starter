const express = require("express")
const router = express.Router()
const userController = require("../controller/user")
const multer = require("multer")
const adminAuth = require("../middleware/adminAuth")
//
const storage = multer({
  dest: "upload/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix)
  },
})
const upload = multer({ storage: storage })
//
router.post("/", userController.add)
router.post("/login", userController.login)
router.get("/auth", adminAuth, userController.auth)

module.exports = router
