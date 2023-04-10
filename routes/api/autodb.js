const express = require("express");
const autobdOperations = require("../../controllers/autodb");
const router = express.Router();

router.get("/manufactures", autobdOperations.manufactures);

router.get("/models/:id", autobdOperations.models);

router.get("/type/:id", autobdOperations.type);

router.get("/search/:query", autobdOperations.search);

router.get("/brand", async (req, res, next) => {
    try {
      const brand = await bdOperation.listManufactures();
      console.log(brand.map(man => man.description))
      res.status(200).json({ brand });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
