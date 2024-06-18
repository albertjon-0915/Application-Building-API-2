const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User.js");
const { errorHandler, createAccessToken } = require("../auth.js");

module.exports.Register = (req, res) => {
     const { name, email, password } = req.body;

     User.findOne({ email: req.body.email })
          .then((result) => {
               if (result) {
                    return res.status(409).send({
                         message: "Email already exist",
                    });
               } else {
                    if (!email.includes("@")) {
                         return res.status(400).send({ message: "Invalid email" });
                    } else if (password.length < 8) {
                         return res.status(400).send({ message: "Invalid password" });
                    } else {
                         const { email, password } = req.body;

                         let newUser = new User({
                              name,
                              email,
                              password: bcrypt.hashSync(password, 10),
                         });

                         newUser
                              .save()
                              .then((result) => {
                                   res.status(200).send({
                                        message: "User Registered Successfully",
                                        user: result,
                                   });
                              })
                              .catch((err) => errorHandler(err, req, res));
                    }
               }
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.Login = (req, res) => {
     const { email, password } = req.body;

     if (email.includes("@")) {
          User.findOne({ email: email })
               .then((result) => {
                    console.log(result);
                    if (!result) {
                         return res.status(404).send({ message: "No email found" });
                    } else {
                         console.log(result.password);
                         let isPasswordCorrect = bcrypt.compareSync(password, result.password);
                         console.log(isPasswordCorrect);
                         if (!isPasswordCorrect) {
                              return res.status(401).send({
                                   message: "Incorrect email or password",
                              });
                         }

                         return res.status(200).send({
                              access: createAccessToken(result),
                         });
                    }
               })
               .catch((err) => errorHandler(err, req, res));
     }
};

module.exports.getUser = (req, res) => {
     User.findById(req.user.id)
          .then((result) => {
               if (!result) {
                    return res.status(404).send({
                         message: "No user found",
                    });
               }
               return res.status(200).send(result);
          })
          .catch((err) => errorHandler(err, req, res));
};
