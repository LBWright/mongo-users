const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
	it('can create a subdocument', (done) => {
		const joe = new User({
			name: 'Joe', 
			posts: 
				[
					{
						title: 'Post Title', 
						content: 'Post Content'
					}
				]
			})
		joe.save()
			.then(()=> {
				User.findOne({name: 'Joe'})
				.then((user) => {
					assert(user.posts[0].title === 'Post Title');
					assert(user.posts[0].content === 'Post Content');
					done();
				})
			})
	}); // 'can create a subdocument'
	it('can add new posts to an existing record', (done) => {
		const joe = new User({
			name: 'Joe',
			posts: [],
		})
		joe.save()
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				user.posts.push({title: 'New Post', content: 'New Content'});
				return user.save(); //this must be returned to return the promise result
			})
			.then((user) => {
				assert(user.posts[0].title === 'New Post')
				assert(user.posts[0].content === 'New Content')
				done();
			})
	})

	it('can remove an existing subdocument', (done) => {
		const joe = new User({
			name: 'Joe',
			posts: 
			[
				{
					title: 'New Title',
					content: 'New Content'
				}
			]
		})
		joe.save()
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				const post = user.posts[0];
				post.remove()
				return user.save()
			})
			.then(() => {
				return User.findOne({name: 'Joe'});
			})
			.then((user) => {
				assert(user.posts.length === 0);
				done();
			})
	}) //'can remove existing subdocument'
});