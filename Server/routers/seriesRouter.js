const express = require("express");
const seriesBL = require("../models/BL/seriesBL");

const router = express.Router();

router.route("/").get(async function (req, res) {
  return res.json(await seriesBL.getAllSeries());
});

router.route("/:id").get(async function (req, res) {
  let id = req.params.id
  return res.json(await seriesBL.getSeries(id));
});

router.route("/:id").put(async function (req, res) {
  let id = req.params.id;
  let obj = req.body;
  return res.json(await seriesBL.updateSeries(id, obj));
});

router.route("/").post(async function (req, res) {
  let obj = req.body;
  return res.json(await seriesBL.addSeries(obj));
});

router.route("/:id").delete(async function (req, res) {
  let id = req.params.id;
  return res.json(await seriesBL.deleteSeries(id));
});

module.exports = router;
