const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");

router.route("/registr").post(async (req, res) => {
  try {
    const { login, email, password } = req.body;

    const newLogin = await User.findOne({ login });
    const newEmail = await User.findOne({ email });

    if (newLogin) {
      return res.status(400).json({ message: "Такой логин уже существует!" });
    }
    if (newEmail) {
      return res.status(400).json({ message: "Такой email уже существует!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ login, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: "Пользователь создан!" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
