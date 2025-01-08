const app = require('./app');
const sequelize = require('./config/db');
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }) // Sync models with DB
    .then(() => {
        console.log('Database synced successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
