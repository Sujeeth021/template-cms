const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const JWT_SECRET="eren139";

async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid email or password" };
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } 
    );

    return {
            success: true,
            token
            };

  } catch (err) {
    return { success: false, message: err.message };
  }
}

async function signup(email, password) {
  try {

    const user = await User.findOne({ email });

    if (user) {
      return { success: false, message: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;

    await User.create({email: email, password: hashedPassword});

    return {
              success: true,
            };

  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
  
}

function logout() {
  return { success: true, message: "Logout successful" };
}

module.exports = {
  login,
  signup,
  logout
};
