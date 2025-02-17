const express = require("express");
const { HandleGenerateShortUrl ,handleGetAnalytics } = require("../controllers/url");
const router = express.Router();

router.post("/" , HandleGenerateShortUrl);
router.get("/analytics/:shortId" ,handleGetAnalytics);



module.exports = router;