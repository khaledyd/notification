const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: "/Users/afrah/Downloads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});

const User = require("../models/User");
const OTP = require("../models/OTPCodes");

const router = express.Router();

router.post("/register", async (req, res) => {
  const data = req.body;

  // CvHeck if passwords are same
  if (data.password !== data.re_password) {
    return res.status(500).send({ message: "Passwords Must be same" });
  }

  try {
    await User.create({
      firstName: data.fname,
      middleName: data.mname,
      lastName: data.lname,
      phone: data.number,
      email: data.email,
      username: data.username,
      password: data.password
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Registration NOT successful" });
  }

  return res.status(200).send({ message: "You are successfully registered" });
});

router.post("/login", async (req, res) => {
  const { username, pass } = req.body;

  const result = await User.findOne({ username });

  // If user is not registered
  if (!result) return res.status(400).send({ message: "Invalid Credentials" });

  // If password is incorrect
   if (result.password != pass)
    return res.status(400).send({ message: "Invalid Credentials" });
  else {
    return res.status(200).send({
      message: "Success",
      imageUrl: result.imageUrl,
      email: result.email
    });
  }
});

router.post("/send-otp/:username", async (req, res) => {
  const { username } = req.params;

  // Check if email exists
  const userExists = await User.findOne({ username });
  if (!userExists)
    return res.status(400).send({ message: "username not registered" });

  console.log(userExists.email);

  // Delete previous OTP codes;
  const previousOTPs = await OTP.find({ username: username });
  for (previousOTP of previousOTPs) {
    OTP.findOneAndDelete(username, function(err, result) {
      if (err) {
        console.log(err);
      }
    });
  }

  const generatedOTP = Math.floor(1000 + Math.random() * 9000);
  try {
    await OTP.create({
      username: userExists.username,
      code: generatedOTP
    });

    sendEmail(generatedOTP, userExists.email);
  } catch (error) {
    console.log(error);
  }

  return res.status(200).send({ message: "OTP Sent" });
});

router.get("/change-image", uploadFile.single("file"), async (req, res) => {
  const { email, newUrl } = req.body;
  const { file } = req;

  console.log(file);
  // try {
  //   await User.findOneAndUpdate(
  //     { email: email },
  //     { $set: { imageUrl: newUrl } },
  //     function(err, result) {
  //       if (err) {
  //         console.log(err);
  //       }
  //     }
  //   );
  // } catch (error) {
  //   console.error(error);
  // }  cx

router.put("/change-password", async (req, res) => {
  const data = req.body;
  const { username, otp, currentPassword, newPassword } = data;

  // RESET PASSWORD WITH OTP
  if (otp) {
    try {
      // Check if OTP is found
      const OTPIsFound = await OTP.findOne({ username });
      if (!OTPIsFound) {
        return res.status(400).send({ message: "OTP is NOT found" });
      }

      // Check if OTP is correct
      const OTPIsCorrect = OTPIsFound.code == otp;
      if (!OTPIsCorrect) {
        return res.status(400).send({ message: "OTP is NOT correct" });
      }

      // CHANGE PASSWORD
      await User.findOneAndUpdate(
        { username: username },
        { $set: { password: newPassword } },
        { new: true },
        function(err, result) {
          if (err) {
            console.log(err);
          }
        }
      );
      return res.status(200).send({ message: "PASSWORD WAS RESET" });
    } catch (error) {
      if (error.message.includes("Query was already executed")) {
        return res.status(200).send({ message: "PASSWORD WAS RESET" });
      }
      return res.status(502).send({ error: error });
    }
  } else {
    // CHANGE PASSWORD WITH NO OTP (USE YOUR CURRENT PASSWORD)

    try {
      // Check if OTP is found
      const UserIsFound = await User.findOne({ username });
      if (!UserIsFound) {
        return res.status(400).send({ message: "User is NOT found" });
      }

      // Check if passwords are same
      if (UserIsFound.password !== currentPassword) {
        return res
          .status(400)
          .send({ message: "Current password NOT correct" });
      } else if (currentPassword === newPassword) {
        return res.status(400).send({
          message: "Current password and New password must be different"
        });
      } else {
        // CHANGE PASSWORD
        await User.findOneAndUpdate(
          { username: username },
          { $set: { password: newPassword } },
          { new: true },
          function(err, result) {
            if (err) {
            }
          }
        );

        return res.status(200).send({ message: "PASSWORD WAS RESET" });
      }
    } catch (error) {
      if (error.message.includes("Query was already executed")) {
        return res.status(200).send({ message: "PASSWORD WAS RESET" });
      }
      return res.status(502).send({ error: error });
    }
  }
});

router.put("/change-mobile", async (req, res) => {
  const data = req.body;
  const { newNumber, email } = data;

  try {
    await User.findOneAndUpdate(
      { email: email },
      { $set: { phone: newNumber } },
      { new: true },
      function(err, result) {
        if (err) {
        }
      }
    );
    return res.status(200).send({ message: "NUMBER WAS CHANGED" });
  } catch (error) {
    console.log(error);
    if (error.message.includes("Query was already executed")) {
      return res.status(200).send({ message: "NUMBER WAS CHANGED" });
    }
    return res.status(502).send({ error: error });
  }
});

function sendEmail(code, receiver) {
  const yourEmail = "mishcalcadde20@gmail.com";
  const yourPassword = "123Khaled##";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: yourEmail,
      pass: yourPassword
    }
  });
  const mailOptions = {
    from: yourEmail,
    to: `${receiver}`,
    subject: "Verification Code",
    text: `Dear User, your verification code is ${code}.`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = {router};
