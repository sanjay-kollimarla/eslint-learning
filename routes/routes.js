const {Router} = require("express");
const { healthController } = require("../controllers");

const router = Router();

router.get("/health", healthController.check);

module.exports = router;