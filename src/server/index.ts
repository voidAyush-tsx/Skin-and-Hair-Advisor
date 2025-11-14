// src/server/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRouter from './analyze.js';

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api', analyzeRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});