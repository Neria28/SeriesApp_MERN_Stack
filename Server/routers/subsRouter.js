const express = require("express");
const subsBL = require("../models/BL/subsBL");

const router = express.Router();

router.route('/')
.get(async function (req, res){
  return res.json(await subsBL.getSubscribers())
})
router.route("/").post(async function (req, res) {
  let obj = req.body;
  return res.json(await subsBL.newSubscriotion(obj));
});

module.exports = router;
