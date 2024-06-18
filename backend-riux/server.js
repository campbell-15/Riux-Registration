    const express = require('express');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');
    const mysql = require('mysql2');
    require('dotenv').config();
    const cors = require('cors');

    const app = express();
    const PORT = process.env.PORT || 5000;

    // Middleware
    app.use(bodyParser.json());
    app.use(cookieParser());

    // CORS configuration
    app.use(cors({
        origin: 'http://localhost:3000', // Allow requests from localhost:3000
        credentials: true, // Include cookies in requests (if applicable)
    }));

    // MySQL connection
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

    db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
    });

    // JWT secret key
    const JWT_SECRET = process.env.JWT_SECRET || 'mySecretKey';

    // Middleware to authenticate future requests
    const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
    };

    // Registration endpoint
    app.post('/api/register', async (req, res) => {
    const { name, email, password, rememberMe } = req.body;

    // Check if the user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        (err, results) => {
            if (err) throw err;

            // Create a JWT token
            const token = jwt.sign({ id: results.insertId, email }, JWT_SECRET, { expiresIn: rememberMe ? '7d' : '1h' });

            // Send the token to the client
            res.cookie('token', token, { httpOnly: true });
            res.json({ message: 'Registration successful', token });
        }
        );
    });
    });

    // Login endpoint
    app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
        return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(400).json({ message: 'Incorrect password' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Send the token to the client
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Login successful', token });
    });
    });

    // Google login endpoint (token validation should be implemented here)
    app.post('/api/google-login', (req, res) => {
    const { token } = req.body;
    // Validate the token with Google's API and retrieve user info
    // Implement this logic based on your Google OAuth setup

    // For now, we assume the token is valid and user info is retrieved
    const user = { id: 123, email: 'googleuser@example.com' }; // Replace with actual user info

    // Create a JWT token
    const jwtToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token to the client
    res.cookie('token', jwtToken, { httpOnly: true });
    res.json({ message: 'Google login successful', token: jwtToken });
    });

    // Protected endpoint
    app.get('/api/user-profile', authenticateToken, (req, res) => {
    res.json({ id: req.user.id, email: req.user.email });
    });

    // Start the server
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
