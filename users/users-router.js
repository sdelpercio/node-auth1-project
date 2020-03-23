const express = require('express');
const bcrypt = require('bcryptjs');
const UserDb = require('./users-model');

const router = express.Router();

router.get('/users', restricted, (req, res) => {
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

	UserDb.findBy({ username })
		.then(([user]) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const id = user.id;
				const username = user.username;
				req.session.user = {
					id: user.id,
					username: user.username
				};
				res.status(200).json({ id, username, message: 'logged in!' });
			} else {
				res.status(401).json({ message: 'Invalid credentials.' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'Issue signing in user', err });
		});
});

function restricted(req, res, next) {
	if (req.session && req.session.user) {
		next();
	} else {
		res.status(401).json({ message: 'wrong' });
	}
}

module.exports = router;
