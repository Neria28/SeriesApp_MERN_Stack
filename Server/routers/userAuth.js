const express = require("express");
const Users = require("../models/Schemas/usersModel");

const router = express.Router();

router.route("/login").post(async function (req, res, next) {
  Users.find({ userName: req.body.userName })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.json({
          message: "User not found"
        })
        
      }
      //check if pwd is incorrect
      if (req.body.pwd !== user[0].pwd) {
        return res.json({
          message: "Invalid password"
        })
        //Check if pwd is correct
      }
      if (req.body.pwd == user[0].pwd) {
        return res.status(200).json({
          loginSuccess: true,
          user : user[0]
                })
      }
      return res.json({
        message: "Auth Faild"
      })
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.message });
    });
});
module.exports = router;
