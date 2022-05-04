const express = require("express");

const { N2yoController } = require("./controllers");

const router = express.Router();

router.get("/n2yo", N2yoController.findLastRecord);
router.get("/n2yo/catbysatid", N2yoController.findCategoryBySatId);

module.exports = router;
