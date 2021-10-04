const express = require("express");
const membersBL = require("../models/BL/membersBL");

const router = express.Router();

router.route('/').get(async function (req, res){
  return res.json(await membersBL.getAllMembers())
})

router.route('/:id').get(async function (req, res){
  let id = req.params.id
  return res.json(await membersBL.getMember(id))
})

router.route("/:id").put(async function (req, res) {
  let id = req.params.id;
  let obj = req.body;
  return res.json(await membersBL.updateMember(id, obj));
});

router.route("/").post(async function (req, res) {
  let obj = req.body;
  return res.json(await membersBL.addMember(obj));
});

router.route("/:id").delete(async function (req, res) {
  let id = req.params.id;
  return res.json(await membersBL.deleteMember(id));
});

module.exports = router;
