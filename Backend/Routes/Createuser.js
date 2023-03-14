const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const user = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtseceret = "dsfsgfjkdhgsdjhfgagfksagdagdjhagjd";
router.post(
  "/createuser",
  [
    body("name", "Invalid Name").isLength({ min: 5 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    try {
      await user.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (e) {
      console.log(e);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userdata = await user.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Email does not matches.. try again" });
      }
      const pwdcompare = await bcrypt.compare(
        req.body.password,
        userdata.password
      );

      if (!pwdcompare) {
        return res
          .status(400)
          .json({ errors: "Password does not matches.. try again" });
      }
      const data = {
        user: {
          id: userdata.id,
        },
      };
      const authToken = jwt.sign(data, jwtseceret);
      return res.json({ success: true, authToken });
    } catch (e) {
      console.log(e);
      res.json({ success: false });
    }
  }
);
module.exports = router;
