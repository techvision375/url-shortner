const shortid = require("shortid");
const URL = require('../models/url');


async function HandleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory:[],
    createdBy: req.user._id,
  });
  return res.render("home" ,{
    id : shortID,
  });
 
}

async function handleGetAnalytics(req,res) {
  // when we press /analytics/:shortId this dynamic routes then shortId me likha sara data req.params.shortId me aajayega.
  
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics : result.visitHistory,
  });
}

module.exports ={
    HandleGenerateShortUrl,
    handleGetAnalytics,
}