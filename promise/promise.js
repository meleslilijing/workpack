// TODO: create Promise is beyond my ablity
function Promise(resolver) {

	this.status = 'pending';

	if(ifFunction(resolver)) {
		resolver
	}
}

Promise.prototype.then = function() {}
Promise.prototype.resolve = function() {}
Promise.prototype.reject = function() {}

function isFunction(f) {
	return type(f, 'function');
}

function type(object, type) {
	if(typeof type !== 'string') {
		throw new Error('Type name only string.');
	}
	var head = type.substring(0, 1).toUpperCase();
	var other = type.substring(1);
	return Object.prototype.toString.call(o) === '[object '+head+other+']'
}