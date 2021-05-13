import express from 'express';
import cors from 'cors';
import multer from 'multer';

export const app = express();
export const upload =  multer({ dest: 'src/util/multer/'});

app.use(cors())
    .use(express.json())
    .use(express.static('public'))
    .use(express.urlencoded({extended: true}))
    .use(upload.any());