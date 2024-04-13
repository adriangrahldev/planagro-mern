import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost:27017/PlanAgro', {}).then(() => {
    console.log("Connected to MongoDB => PlanAgro");
}).catch((err) => {
    console.error("Error connecting to MongoDB => PlanAgro", err);
    process.exit(1);
});