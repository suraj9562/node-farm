const express = require("express");
const { home, product, api } = require("../controllers/nodeFarmcontroller.js");

const router = express.Router();

// routes
router.get("/", home);
router.get("/overview", home);
router.get("/product/:id", product);
router.get("/api", api);

module.exports = router;
