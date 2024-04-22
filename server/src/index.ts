import express, { urlencoded } from 'express';
import fieldRoutes from './routes/field.routes';
import activityRoutes from './routes/activity.routes';
import userRoutes from './routes/user.routes';
import dashboardRoutes from './routes/dashboard.routes';
import cors from 'cors';

// Connectar a MongoDB
require('./config/database.config')

// Inicializar Express
const app = express();

// Middleware
app.use(express.json());
app.use(urlencoded({extended:true}))

//Configutar cors

app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:3000',
    ]
}));

// Rutas
app.use('/api/fields', fieldRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
