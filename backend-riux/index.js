// // backend/index.js
// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./config/database'); 
// const userRoutes = require('./routes/userRoutes');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', userRoutes);

// const PORT = process.env.PORT || 5000;

// sequelize.authenticate()
//     .then(() => {
//         console.log('Database connected...');
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
