
import express from 'express';
import cors from 'cors';
import visitorRoutes from './routes/visitorRoutes';
const bodyParser = require("body-parser");
import authorRoutes from './routes/authorRoutes';

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



app.use('/api/visitor', visitorRoutes);

app.use('/api/author', authorRoutes);

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