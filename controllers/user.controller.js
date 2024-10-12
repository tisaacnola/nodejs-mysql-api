const bcryptjs = require("bcryptjs");
const models = require("../models");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

function signUp(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            };
            const schema = {
              name: { type: "string", optional: false, max: "100" },
              email: { type: "string", optional: false, max: "500" },
              password: { type: "string", optional: false },
            };

            const v = new Validator();
            const validationResponse = v.validate(user, schema);

            if (validationResponse !== true) {
              return res.status(400).json({
                message: "validation failed",
                error: validationResponse,
              });
            }
            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: error,
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}

function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                process.env.JWT_KEY,
                function (err, token) {
                  res.status(200).json({
                    message: "Authentication successful",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invalid credentials",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}

module.exports = {
  signUp: signUp,
  login: login,
};
