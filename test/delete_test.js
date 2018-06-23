const assert = require('assert')
const User = require('../src/user');

describe('Deleting a user', ()=> {
	//Mongo uses the remove terminology, not delete.
	//3 methods in the model class, 1 method in the model instance
	//joe.remove() will remove joe from the database -- this is really good if we already have an instance of the class
	//Model.remove(criteria) will remove data with the criteria
	//     .findOneAndRemove(criteria) will remove first one with that critera
	//     .findByIdAndRemove(id) will remove based on id.
	let joe;

	beforeEach((done) => {
		joe = new User({name: 'Joe'});
		joe.save()
			.then(() => done());
	})

	it('model instance remove', (done) => {
		//removes this specific instance
		joe.remove() //this returns a promise
			.then(() => User.findOne({name: 'Joe'})) //This user returns a promise that returns a user
			.then(user => {
				assert(user === null);
				done()
			});
	});

	it('class method remove', (done) => {
		//remove several records at once
		User.remove({name: 'Joe'})
			.then(() => User.findOne({name: 'Joe'})) //This user returns a promise that returns a user
			.then(user => {
				assert(!user);
				done()
			});
	});

	it('class method findOneAndRemove', (done) =>{
		User.findOneAndRemove({name: 'Joe'})
			.then(() => User.findOne({name: 'Joe'}))
			.then(user => {
				assert(!user);
				done();
		})
	})

	it('class method findByIdAndRemove', (done) =>{
		User.findByIdAndRemove( joe._id)
			.then(() => User.findOne({name: 'Joe'}))
			.then(user => {
				assert(!user);
				done();
			})
	})
});