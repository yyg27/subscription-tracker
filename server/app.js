import express from 'express';
import cors from 'cors';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';   
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // built-in middleware to use json
app.use(express.urlencoded({extended:false})); // 
app.use(arcjetMiddleware)

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);
app.use('/api/v1/workflow',workflowRouter);

app.use(errorMiddleware);

app.get('/',(req,res) => {
    res.send("HELLO WORLD");
})

app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`); 
    await connectToDatabase(); // we made this async because connectToDatabase is async and uses await
}) 
