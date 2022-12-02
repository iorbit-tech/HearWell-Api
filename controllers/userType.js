const UserType = require("../models/userType")

exports.getAllUserType = (req, res) => {
    UserType.find()
      .then((userType) => {
        console.log({ userType });
        res.json(userType);
      })
      .catch((err) =>
        res.status(404).json({ message: "no vitals found", error: err.message })
      );
  };