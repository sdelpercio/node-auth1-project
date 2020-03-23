const express = require('express');
const bcrypt = require('bcryptjs');
const UserDb = require('./users-model');

const router = express.Router();

router.get('/users', (req, res) => {
	UserDb.findAll()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(500).json({ error: 'Issue getting users' });
		});
});
router.post('/register', (req, res) => {
	const userInfo = req.body;
	const hash = bcrypt.hashSync(userInfo.password, 8);
	userInfo.password = hash;

	UserDb.insert(userInfo)
		.then(id => {
			res.status(201).json(id);
		})
		.catch(err => {
			res.status(500).json({ error: 'Issue creating user', err });
		});
});
router.post('/login', (req, res) => {
	const { username, password } = req.body;
});

module.exports = router;
