// var Promise = (function() {
// 	var PENDING = 0, 
// 		FULFILLED = 1, 
// 		REJECTED = 2;

// 	function resolve(msg) {
// 		this._state = FULFILLED;		
// 	}

// 	function reject(msg) {
// 		this._state = REJECTED;
// 	}

// 	function publish() {

// 	}

// 	function subscript(parent, child, onFulfillment, onRejection) {

// 	}

// 	function Promise(resolver) {
		
// 		if(typeof resolver != 'function') {
// 			throw TypeError('Promise resolver not function.');
// 		}

// 		// 状态 pending fulfilled rejected
// 		this._state = PENDING;
// 		// 计算结果，作为下一个 then 的参数
// 		this._result = undefined;
// 		// function 存储数组
// 		this._subscript = [];

// 		var promise = this;

// 		try {
// 			// maybe can use Function.prototype.bind
// 			resolver(function(msg) {
// 				resolve.call(promise, msg);
// 			}, function(msg) {
// 				reject.call(promise, msg);
// 			});
// 		} catch(error) {
// 			// reject(promise, msg);
// 		}

// 		this['then'] = function(onFulfillment, onRejection) {
			
// 			var parent = this;
// 			var state = this._state;

// 			if(state === FULFILLED && !onFulfillment || state === REJECTED && !onRejection) {
// 				return parent;
// 			}

// 			var child = new Promise(function() {})
// 			var result = parent._result;

// 			// first time into .then(), exe all function in this._subscript;
// 			if(state === PENDING) {

// 			} 
// 			else {
// 				subscript(parent, child, onFulfillment, onRejection);
// 			}

// 			return child;
// 		}

// 		this['catch'] = function() {

// 		}
		
// 	}

// 	return Promise;
// })();

function Promise(resolver) {
	var state = null;
	var value = null;
	var deffers = [];

	var self = this;

	this.then = function(onFulfillment, onRejection) {
		return new Promise(function(resolve, reject) {
			handle(new Handler(onFulfillment, onRejection, resolve, reject));
		});
	}

	function handle(deffered) {

		if(state === null) {
			deffers.push(deffered);
			return
		}

		// promise 完成时执行队列，asap 新开线程
		asap(function() {
			var cb = state ? deferred.onFulfilled : deferred.onRejected
	        if (cb === null) {
	            (state ? deferred.resolve : deferred.reject)(value)
	            return
	        }
	        var ret
	        try {
	            ret = cb(value)
	        } catch (e) {
	            deferred.reject(e)
	            return
	        }
	        deferred.resolve(ret)
		})
	}

	function resolve() {}

	function reject() {}

	// resolve 或者 reject时执行，遍历执行 handle(deffed);
	function final() {}

	function doResolve(resolver, onFulfillment, onRejection) {
		
		// a lock, save only one callback function can be used;
		var done = false;
		
		try {
			resolver(function(value) {
				if(done) return
				done = true;
				onFulfillment(value);
			}, function(reason) {
				if(done) return
				done = true;
				onRejection(reason);
			})
		} catch (e) {
			if(done) return
			done = true;
			onRejection(e);
		}

	}
}

// 首次
function Handler(onFulfillment, onRejection, resolve, reject) {
	this.onFulfillment = typeof onFulfillment === 'function' ? onFulfillment : null;
	this.onRejection = typeof onRejection === 'function' ? onRejection : null;
	this.resolve = resolve;
	this.reject = reject;
}

function asap(fn) {
	setTimeout(fn, 0);
}

function main() {

	function sleep(time) {
		return new Promise(function(resolve, reject) {
			try {
				setTimeout(function() {
					resolve()
				}, time)
			} catch(e) {
				reject();
			}
		});
	}

	sleep(2000)
		.then(function(value) {
			console.log('Wake up. value:', value);
		}, function() {
			console.log('Have some error, continue sleeping...');
		});
}

main();



'''
	静态方法
	resolve
	reject
	all
	race
'''