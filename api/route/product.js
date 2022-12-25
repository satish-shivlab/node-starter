const express = require("express")
const router = express.Router()
const Product = require("../controller/product")
const multer = require("multer")
const path = require("path")
// //
// const storage = multer({
//   dest: "upload/",
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
//     cb(null, file.fieldname + "-" + uniqueSuffix)
//   },
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/product/")
  },

  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    )
  },
})
const upload = multer({ storage: storage })

router.post("/", upload.single("product_image"), Product.add)
router.get("/", Product.getAll)
router.get("/:id", Product.detail)
router.put("/:id", upload.single("product_image"), Product.update)
module.exports = router
