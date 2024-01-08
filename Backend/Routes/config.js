const express = require("express");

const router = express.Router();

const getConfig = require("../Controller/config");

router.get("/configuration/:id", getConfig.getConfig);

router.put("/configuration/:id", getConfig.putConfig);

module.exports = router;
