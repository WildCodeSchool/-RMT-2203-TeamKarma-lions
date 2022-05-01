const express = require("express");

const { N2yoController } = require("./controllers");

const router = express.Router();

router.get("/n2yo", N2yoController.browse);
router.get("/n2yo/:id", N2yoController.read);
// router.put("/n2yo/:id", N2yoController.edit);
router.post("/n2yo", N2yoController.add);
router.delete("/n2yo/:id", N2yoController.delete);

module.exports = router;
