import express from 'express';
import cors from 'cors';

export const app = express();

app.use(express.json())
    .use(express.static('public'))
    .use(cors())