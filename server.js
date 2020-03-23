const express = require('express');
const morgan = require('morgan');
const userRouter = require('./users/users-router');
const session = require('express-session');

const sessionConfig = {
	name: 'jumanji',
	secret: 'one ring to rule them all',
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
		secure: false,
		httpOnly: true
	},
	resave: false,
	saveUninitialized: true
};

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(session(sessionConfig));

server.use('/api', userRouter);

server.get('/', (req, res) => {
	res.status(200).json({ message: 'all good' });
});

module.exports = server;
