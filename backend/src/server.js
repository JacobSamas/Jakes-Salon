const app = require('./app');
const sequelize = require('./config/db');
const PORT = process.env.PORT || 5000;

// Import models to ensure they are registered with Sequelize
require('./models/User');
require('./models/Appointment');

sequelize.sync({ alter: true }) // Sync models with the database
    .then(() => {
        console.log('Database synced successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
