import express, { json } from 'express';
import cors from 'cors';

export const app = express();

app.use(express.static('public'))
    .use(cors())
    .use(json())