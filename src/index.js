const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const server = http.createServer(app);
const dotenv = require('dotenv');
const route = require('./routes/index')

dotenv.config();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));

const PORT = process.env.PORT || 3001;

const URI = process.env.URI || 'mongodb+srv://engtalkfordev:engtalkfordev@cluster0.xah4te4.mongodb.net/?retryWrites=true&w=majority';

app.use('/', cors());
const socketIo = require("socket.io")(server, {
    cors: '*'
});


socketIo.on('connection', (socket) => {
    console.log('a user connected');
});

mongoose.set('strictQuery', false);
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connect to DB');
        server.listen(PORT, () => {
            console.log('run server');
        });
    })
    .catch(err => {
        throw (err);
    })


route(app);

