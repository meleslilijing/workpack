function encodeFormData(data) {
	if(!data) return '';
	var arr = [];
	for(name in data) {
		if(data.hasOwnProperty(name)) continue;
		if(typeof data[name] === 'function') continue;
		var value = data[name].toString();
		name = encodeURIComponent(name.replace('%20', '+'));
		value = encodeURIComponent(value.replace('%20', '+'));
		arr.push(name+'='+value);
	}
	return arr.join('&');
}

var ajax = {
	get: function(url, data, success, error) {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', url+'?'+encodeFormData(data), true);

		xhr.onreadystatechange = function() {
			if( xhr.readyState === 4 ) {
				if( xhr.status === 200 ) {
					success( JSON.parse(xhr.responseText) );
				}
				else {
					error(xhr.status)
				}
			}
		}

		xhr.send(null)
	},
	post: function(url, data, success, error) {
		var xhr = new XMLHttpRequest();

		xhr.open('POST', url, true);

		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				if( xhr.status === 200 ) {
					success( JSON.parse(xhr.responseText) );
				}
				else {
					error(xhr.status);
				}
			}
		}

		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.send(encodeFormData(data));
	},
	file: function(url, data, success, error) {
		var xhr = new XMLHttpRequest();

		xhr.open('POST', url, true);

		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				if( xhr.status === 200 ) {
					success( JSON.parse(xhr.responseText) );
				}
				else {
					error(xhr.status);
				}
			}
		}

		var formData = new FormData();

		for(var name in data) {

			if(!data.hasOwnProperty(name)) continue;

			var value = data[name];
			if(typeof value === 'function') continue;

			formData.append(name, value);
		}

		xhr.send(formData);
	}
}
