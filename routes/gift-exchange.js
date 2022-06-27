const express = require("express");
const app = express();
const router = express.Router();
const GiftExchangeModel = require("../models/gift-exchange");
const { pairs } = require("../models/gift-exchange");
router.post("/pairs", async function (req, res, next) {
  // next parameter???
  try {
    const gifts = await GiftExchangeModel.pairs(req.body.names);
    res.status(200).json(gifts);
  } catch (err) {
    next(err);
  }
});

router.post("/traditional", async function (req, res, next) {
  try {
    const gifts = await GiftExchangeModel.pairs(req.body.names);
    res.status(200).json(gifts);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
