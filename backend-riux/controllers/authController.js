// // backend/controllers/authController.js
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.register = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({ name, email, password: hashedPassword });

//         const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//             expiresIn: '1h',
//         });

//         res.status(201).json({ token, userId: user.id });
//     } catch (error) {
//         res.status(500).json({ error: 'User registration failed' });
//     }
// };

// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ where: { email } });

//         if (!user) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//             expiresIn: '1h',
//         });

//         res.status(200).json({ token, userId: user.id });
//     } catch (error) {
//         res.status(500).json({ error: 'Login failed' });
//     }
// };
