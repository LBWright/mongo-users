const assert = require('assert');
const User = require('../src/user');
//updating a method

//instanced updating
// joe.update({updated}) or the 'set' and 'save' methods

describe('Updating records', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		joe.save()
			.then(()=>{
				done();
			})
	});

	function assertName(operation, done) {
		operation
		.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex')
				done();
			})
	} 
	
	it('instance type using set and save', (done) => {
		//we might want to update several properties in different steps, and only after, make the save
		joe.set('name', 'Alex');
		assertName(joe.save(), done)
			
	})
	
	it('a model instance can update via update()', (done) => {
		assertName(joe.update({name: 'Alex'}), done)
	})


})