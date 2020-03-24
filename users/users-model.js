const db = require('../data/dbConfig');

module.exports = {
	insert,
	findAll,
	findById,
	findBy
};

function insert(userInfo) {
	return db('users')
		.insert(userInfo, 'id')
		.then(id => {
			return findById(id[0]);
		});
}
function findAll() {
	return db('users');
}
function findById(id) {
	return db('users')
		.where({ id })
		.first();
}
function findBy(filter) {
	return db('users').where(filter);
}
