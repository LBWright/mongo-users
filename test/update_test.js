const assert = require('assert');
const User = require('../src/user');
//updating a method

//instanced updating
// joe.update({updated}) or the 'set' and 'save' methods

describe('Updating records', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({name: 'Joe', postCount: 0});
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
	
	it('a model class based can update',(done) => {
		assertName(User.update({name: 'Joe'}, {name: 'Alex'}), done);
	})

	it('a model class can update one record',(done) => {
		assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}), done)
	})

	it('a model class can find a record with an id and update',(done) => {
		assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done);
	})

	xit('a user can have their postcount incremented by 1', (done) => {
		User.update({name: 'Joe'}, { $inc: { postCount: 1}})
		.then(() => User.findOne({name: 'Joe'}))
		.then((user) => {
			assert(user.postCount === 1);
			done();
		})
	})
})