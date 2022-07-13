const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');
const cors = require('cors');

app.use(logger('dev'));

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.json());

// function selectProxyHost(req) {
//     if (req.path.startsWith('/mail1'))
//         return 'http://mailer1:4000/';
//     else if (req.path.startsWith('/mail2'))
//         return 'http://mailer2:5000/';
// }

// app.use((req) =>  httpProxy(selectProxyHost(req)));

// app.use('/', (req, res) => {
//     console.log('Aqui!')
//     // httpProxy(selectProxyHost(req));
//     httpProxy('http://localhost:4000/')
// });

// // httpProxy('http://localhost:4000/')

// app.use((req, res, next) => {
//     httpProxy(selectProxyHost(req))(req, res, next);
// });

app.use('/mail1', httpProxy('http://mailer1:4000/'));
app.use('/mail2', httpProxy('http://mailer2:5000/'));

app.listen(10000, () => {
    console.log('API Gateway running!');
});