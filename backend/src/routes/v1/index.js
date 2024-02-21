const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth_route"));
router.use("/user", require("./user_route"));
router.use("/event", require("./event_route"));

module.exports = router;
