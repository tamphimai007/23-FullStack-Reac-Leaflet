const express = require("express");
const router = express.Router();

const { list, create, remove, read, update } = require("../Controllers/travel");

const { upload } = require("../Middleware/upload");

//http://localhost:5000/api/product
router.get("/travel", list);
router.post("/travel", upload, create);
router.delete("/travel/:id", remove);
router.get("/travel/:id", read);
router.put("/travel/:id",upload, update);

module.exports = router;
