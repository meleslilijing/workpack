// Todo 添加单元测试
// 添加异常
	
/**
 * map(function, iterable, ...)
 *
 *  Apply function to every item of iterable and return a list of the results.
 *  If additional iterable arguments are passed, 
 *  function must take that many arguments and is applied to the items from all iterables in parallel. 
 *  If one iterable is shorter than another it is assumed to be extended with None items. 
 *  If function is None, the identity function is assumed; 
 *  if there are multiple arguments, 
 *  map() returns a list consisting of tuples containing the corresponding items from all iterables (a kind of transpose operation). 
 *  The iterable arguments may be a sequence or any iterable object; the result is always a list.
 *
 *  test: 
 *
 *  	lst1 = [1,2,3,4,5]
 *		lst2 = [6,7,8,9,0]
 *		map(function(x,y) {return x+y;}, lst1,lst2) 
 *
 * 		>>> [7, 9, 11, 13, 5]
 */

function map() {
	if(arguments.length < 2) return;

	var handler = Array.prototype.shift.call(arguments);
	if( typeof handler !== 'function' ) return;

	var result = [];
	var length = arguments[0].length;
	
	for( var i = 0; i < arguments.length; i++ ) {
		var item = arguments[i];
		if( Object.prototype.toString.call(item) !== '[object Array]' || item.length !== length ) return;
	}

	for( var i = 0; i < length; i++) {

		var params = [];

		for(var j = 0; j < arguments.length; j++) {

			var item = arguments[j];
			params.push(item[i])

		}

		var m = handler.apply(null, params)
		result.push(m);
	}

	return result;
}

/**
 * reduce(function, iterable)

	Apply function of two arguments cumulatively to the items of iterable, 
	from left to right, so as to reduce the iterable to a single value. For example, 
	reduce(lambda x, y: x+y, [1, 2, 3, 4, 5]) calculates ((((1+2)+3)+4)+5). 
	The left argument, x, is the accumulated value and the right argument, y, is the update value from the iterable. 
	If the optional initializer is present, it is placed before the items of the iterable in the calculation,
	and serves as a default when the iterable is empty. If initializer is not given and iterable contains only one item,
	the first item is returned. 

	test:
		var list1 = [1, 2, 3, 4, 5];
		reduce(function(a, b) {
			return a+b;
		}, list1)

		>>> 15
 */
function reduce(fn, iterable) {
	var result = iterable[0]
	for(var i = 1; i < iterable.length; i++ ) {
		result = fn(result, iterable[i]);
	}
	return result;
}

/*
	filter(function, iterable)

		Construct a list from those elements of iterable for which function returns true. 
		iterable may be either a sequence, a container which supports iteration, or an iterator. 
		If iterable is a string or a tuple, the result also has that type; otherwise it is always a list. 
		If function is None, the identity function is assumed, that is, all elements of iterable that are false are removed.

		Note that filter(function, iterable) is equivalent to [item for item in iterable if function(item)] 
		if function is not None and [item for item in iterable if item] if function is None.

	test:
		var list = [1, 2, 3, 4, 5]
		filter(function(x) {return x > 2;}, list)

		>>> [3, 4, 5]


		var str = 'There be a light.'
		filter(function(x) {return x !== ' ';}, str)

		>>> 'Therebealight.'
*/

function filter(fn, iterable) {
	var result = [];
	
	for(var i = 0; i < iterable.length; i++) {
		var value = fn(iterable[i]);

		if(value == true) {
			result.push(iterable[i])
		}
	}

	return result;
}








