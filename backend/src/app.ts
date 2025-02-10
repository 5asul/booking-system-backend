
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import patentRoutes from './routes/patentRoutes';
import doctorRoutes from './routes/doctorRoutes';
const bodyParser = require("body-parser");


const app = express();
// const corsOptions = {
//     origin: 'https://ahmed-chat-io.vercel.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
//   };
  
// Remove manual CORS middleware completely
app.use(cors());
// app.options('*', cors(corsOptions)); // Keep preflight

app.use(express.json({ limit: "10mb" }));



app.use('/api/auth', authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/patent',patentRoutes);
app.use('api/doctor',doctorRoutes);




// Add this AFTER all routes
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server Error:', err);
    res.status(500).json({
      error: process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err.message
    });
  });

export default app;