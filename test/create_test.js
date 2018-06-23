const assert = require('assert');
const User = require('../src/user')

describe('Creating records', ()=>{
	it('saves a user', (done)=>{
		const logan = new User({ name: 'Logan'})
		logan.save()
		  .then(()=>{
			assert(!logan.isNew);
			done();
		  });
	});
});