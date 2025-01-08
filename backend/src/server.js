const app = require('./app');
const sequelize = require('./config/db');
const PORT = process.env.PORT || 5000;

require('./models/User');
require('./models/Appointment');
require('./models/Service'); 

sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('Database synced successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
