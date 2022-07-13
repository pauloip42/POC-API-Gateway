const express = require('express');
const email = require('./services/mailer');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.json());

const port = 5000;

app.use('/', email);

app.listen(port, () => {console.log('Started!')});