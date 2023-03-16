const express = require("express");
const autobdOperations = require("../../controllers/autodb");
const router = express.Router();
const { schemas } = require("../../models/auto")
const {validateBody, isValidId, authenticate} = require("../../middlewares");

router.get("/manufactures", autobdOperations.manufactures);

router.get("/models/:id", autobdOperations.models);

router.get("/type/:id", autobdOperations.type);

router.get("/search/:query", autobdOperations.search);

router.get("/manuf", autobdOperations.manuf);
router.get("/mod/:id", autobdOperations.mod);

module.exports = router;
