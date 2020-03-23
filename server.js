const express = require('express');
const morgan = require('morgan');
const userRouter = require('./users/users-router');

const server = express();

server.use(express.json());
server.use(morgan('dev'));

server.use('/api', userRouter);

server.get('/', (req, res) => {
	res.status(200).json({ message: 'all good' });
});

module.exports = server;
