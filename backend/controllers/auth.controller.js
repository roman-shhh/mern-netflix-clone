import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegexp.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const existingUserByEmail = await User.findOne({ email })
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const existingUserByUSername = await User.findOne({ username })
    if (existingUserByUSername) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const imageIndex = Math.floor(Math.random() * PROFILE_PICS.length);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image: PROFILE_PICS[imageIndex],
    });

    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        ...newUser._doc,
        password: ""
      }
    });
  } catch (error) {
    console.error("Error signup controller", error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        ...user._doc,
        password: ""
      }
    });
  } catch (error) {
    console.error("Error login controller", error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie('jwt-netflix');
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error("Error logout controller", error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export async function authCheck(req, res) {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error("Error in authCheck controller", error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}