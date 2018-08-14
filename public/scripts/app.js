(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var marvel = {};

var ts = new Date().getTime();
var privateKey = '751726e3c08cb5df4b6899d41abba79a1294c429';
var publicKey = 'ee31870724710eb9b3d32cf88e49b9b3';
var hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

marvel.getMarvel = function (query) {

	$.ajax({
		url: 'http://gateway.marvel.com/v1/public/comics',
		method: 'GET',
		dataType: 'json',
		data: {
			ts: ts,
			apikey: publicKey,
			hash: hash,
			title: query
		}
	}).then(function (res) {
		// console.log(res.data.results);
		marvel.displayMarvel(res.data.results);
	});
};

marvel.displayMarvel = function (allMarvel) {
	// console.log(allMarvel);
	// console.log(allMarvel.length);
	var $noChar = $('<h2>').text('This character does not exist in this database!');
	if (allMarvel.length === 0) {
		$('#content').empty();
		$('#content').append($noChar);
		setTimeout(function () {
			$('h2').hide();
		}, 2000);
	} else {
		$('#content').empty();
		allMarvel.filter(function (marvelPiece) {
			// console.log(marvelPiece);
			return marvelPiece != null;
		}).forEach(function (piece) {
			// console.log(piece);
			var img = piece.images[0].path + '.' + piece.images[0].extension;
			var $title = $('<h2>').text(piece.title);
			var $description = $('<p>').addClass('description').text(piece.description);
			var $img = $('<img>').attr('src', img);
			// console.log(allMarvel.length);
			$('#content').append($title, $description, $img);
			$('input[type=text]').val('');
		});
	};
};

marvel.init = function () {
	marvel.getMarvel('');
	$('form').on('submit', function (event) {
		$('#content').empty();
		event.preventDefault();
		// console.log('changed');
		var character = $('input[type=text]').val();
		// console.log(character);
		marvel.getMarvel(character);
		var $loading = $('<h1>').text('Loading. . .');
		$('#content').append($loading);
		setTimeout(function () {
			$('h1').hide();
		}, 20000);
	});
};

$(function () {
	marvel.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sU0FBUyxFQUFmOztBQUVBLElBQU0sS0FBSyxJQUFJLElBQUosR0FBVyxPQUFYLEVBQVg7QUFDQSxJQUFNLGFBQWEsMENBQW5CO0FBQ0EsSUFBTSxZQUFZLGtDQUFsQjtBQUNBLElBQU0sT0FBTyxTQUFTLEdBQVQsQ0FBYSxLQUFHLFVBQUgsR0FBYyxTQUEzQixFQUFzQyxRQUF0QyxFQUFiOztBQUVBLE9BQU8sU0FBUCxHQUFtQixVQUFDLEtBQUQsRUFBVzs7QUFFNUIsR0FBRSxJQUFGLENBQU87QUFDTixPQUFLLDRDQURDO0FBRU4sVUFBUSxLQUZGO0FBR04sWUFBVSxNQUhKO0FBSU4sUUFBSztBQUNKLE9BQUksRUFEQTtBQUVKLFdBQVEsU0FGSjtBQUdKLFNBQU0sSUFIRjtBQUlKLFVBQU87QUFKSDtBQUpDLEVBQVAsRUFVRSxJQVZGLENBVU8sVUFBQyxHQUFELEVBQVM7QUFDaEI7QUFDQSxTQUFPLGFBQVAsQ0FBcUIsSUFBSSxJQUFKLENBQVMsT0FBOUI7QUFDQSxFQWJBO0FBY0QsQ0FoQkQ7O0FBa0JBLE9BQU8sYUFBUCxHQUF1QixVQUFDLFNBQUQsRUFBZTtBQUNyQztBQUNBO0FBQ0EsS0FBTSxVQUFVLEVBQUUsTUFBRixFQUFVLElBQVYsQ0FBZSxpREFBZixDQUFoQjtBQUNBLEtBQUksVUFBVSxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQzNCLElBQUUsVUFBRixFQUFjLEtBQWQ7QUFDQSxJQUFFLFVBQUYsRUFBYyxNQUFkLENBQXFCLE9BQXJCO0FBQ0EsYUFBVyxZQUFZO0FBQ3RCLEtBQUUsSUFBRixFQUFRLElBQVI7QUFDQSxHQUZELEVBRUcsSUFGSDtBQUdBLEVBTkQsTUFNSztBQUNKLElBQUUsVUFBRixFQUFjLEtBQWQ7QUFDQSxZQUFVLE1BQVYsQ0FBaUIsVUFBQyxXQUFELEVBQWlCO0FBQ2pDO0FBQ0EsVUFBTyxlQUFlLElBQXRCO0FBQ0EsR0FIRCxFQUdHLE9BSEgsQ0FHVyxVQUFDLEtBQUQsRUFBVTtBQUNwQjtBQUNBLE9BQU0sTUFBUyxNQUFNLE1BQU4sQ0FBYSxDQUFiLEVBQWdCLElBQXpCLFNBQWlDLE1BQU0sTUFBTixDQUFhLENBQWIsRUFBZ0IsU0FBdkQ7QUFDQSxPQUFNLFNBQVMsRUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLE1BQU0sS0FBckIsQ0FBZjtBQUNBLE9BQU0sZUFBZSxFQUFFLEtBQUYsRUFBUyxRQUFULENBQWtCLGFBQWxCLEVBQWlDLElBQWpDLENBQXNDLE1BQU0sV0FBNUMsQ0FBckI7QUFDQSxPQUFNLE9BQU8sRUFBRSxPQUFGLEVBQVcsSUFBWCxDQUFnQixLQUFoQixFQUF1QixHQUF2QixDQUFiO0FBQ0E7QUFDQSxLQUFFLFVBQUYsRUFBYyxNQUFkLENBQXFCLE1BQXJCLEVBQTZCLFlBQTdCLEVBQTJDLElBQTNDO0FBQ0EsS0FBRSxrQkFBRixFQUFzQixHQUF0QixDQUEwQixFQUExQjtBQUNBLEdBWkQ7QUFhQTtBQUNELENBMUJEOztBQTRCQSxPQUFPLElBQVAsR0FBYyxZQUFNO0FBQ25CLFFBQU8sU0FBUCxDQUFpQixFQUFqQjtBQUNBLEdBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLFVBQVMsS0FBVCxFQUFnQjtBQUN0QyxJQUFFLFVBQUYsRUFBYyxLQUFkO0FBQ0EsUUFBTSxjQUFOO0FBQ0E7QUFDQSxNQUFNLFlBQVksRUFBRSxrQkFBRixFQUFzQixHQUF0QixFQUFsQjtBQUNBO0FBQ0EsU0FBTyxTQUFQLENBQWlCLFNBQWpCO0FBQ0EsTUFBTSxXQUFXLEVBQUUsTUFBRixFQUFVLElBQVYsQ0FBZSxjQUFmLENBQWpCO0FBQ0EsSUFBRSxVQUFGLEVBQWMsTUFBZCxDQUFxQixRQUFyQjtBQUNBLGFBQVcsWUFBWTtBQUN0QixLQUFFLElBQUYsRUFBUSxJQUFSO0FBQ0EsR0FGRCxFQUVHLEtBRkg7QUFHQSxFQVpEO0FBYUEsQ0FmRDs7QUFpQkEsRUFBRSxZQUFVO0FBQ1gsUUFBTyxJQUFQO0FBQ0EsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IG1hcnZlbCA9IHt9O1xuXG5jb25zdCB0cyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuY29uc3QgcHJpdmF0ZUtleSA9ICc3NTE3MjZlM2MwOGNiNWRmNGI2ODk5ZDQxYWJiYTc5YTEyOTRjNDI5JztcbmNvbnN0IHB1YmxpY0tleSA9ICdlZTMxODcwNzI0NzEwZWI5YjNkMzJjZjg4ZTQ5YjliMyc7XG5jb25zdCBoYXNoID0gQ3J5cHRvSlMuTUQ1KHRzK3ByaXZhdGVLZXkrcHVibGljS2V5KS50b1N0cmluZygpO1xuXG5tYXJ2ZWwuZ2V0TWFydmVsID0gKHF1ZXJ5KSA9PiB7XG5cdFxuXHRcdCQuYWpheCh7XG5cdFx0XHR1cmw6ICdodHRwOi8vZ2F0ZXdheS5tYXJ2ZWwuY29tL3YxL3B1YmxpYy9jb21pY3MnLFxuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRkYXRhOntcblx0XHRcdFx0dHM6IHRzLFxuXHRcdFx0XHRhcGlrZXk6IHB1YmxpY0tleSxcblx0XHRcdFx0aGFzaDogaGFzaCxcblx0XHRcdFx0dGl0bGU6IHF1ZXJ5XG5cdFx0XHR9XG5cdH0pLnRoZW4oKHJlcykgPT4ge1xuXHRcdC8vIGNvbnNvbGUubG9nKHJlcy5kYXRhLnJlc3VsdHMpO1xuXHRcdG1hcnZlbC5kaXNwbGF5TWFydmVsKHJlcy5kYXRhLnJlc3VsdHMpO1xuXHR9KTtcbn07XG5cbm1hcnZlbC5kaXNwbGF5TWFydmVsID0gKGFsbE1hcnZlbCkgPT4ge1xuXHQvLyBjb25zb2xlLmxvZyhhbGxNYXJ2ZWwpO1xuXHQvLyBjb25zb2xlLmxvZyhhbGxNYXJ2ZWwubGVuZ3RoKTtcblx0Y29uc3QgJG5vQ2hhciA9ICQoJzxoMj4nKS50ZXh0KCdUaGlzIGNoYXJhY3RlciBkb2VzIG5vdCBleGlzdCBpbiB0aGlzIGRhdGFiYXNlIScpO1xuXHRpZiAoYWxsTWFydmVsLmxlbmd0aCA9PT0gMCkge1xuXHRcdCQoJyNjb250ZW50JykuZW1wdHkoKTtcblx0XHQkKCcjY29udGVudCcpLmFwcGVuZCgkbm9DaGFyKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJ2gyJykuaGlkZSgpO1xuXHRcdH0sIDIwMDApO1xuXHR9ZWxzZXtcblx0XHQkKCcjY29udGVudCcpLmVtcHR5KCk7XG5cdFx0YWxsTWFydmVsLmZpbHRlcigobWFydmVsUGllY2UpID0+IHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKG1hcnZlbFBpZWNlKTtcblx0XHRcdHJldHVybiBtYXJ2ZWxQaWVjZSAhPSBudWxsO1xuXHRcdH0pLmZvckVhY2goKHBpZWNlKSA9Pntcblx0XHRcdC8vIGNvbnNvbGUubG9nKHBpZWNlKTtcblx0XHRcdGNvbnN0IGltZyA9IGAke3BpZWNlLmltYWdlc1swXS5wYXRofS4ke3BpZWNlLmltYWdlc1swXS5leHRlbnNpb259YDtcblx0XHRcdGNvbnN0ICR0aXRsZSA9ICQoJzxoMj4nKS50ZXh0KHBpZWNlLnRpdGxlKTtcblx0XHRcdGNvbnN0ICRkZXNjcmlwdGlvbiA9ICQoJzxwPicpLmFkZENsYXNzKCdkZXNjcmlwdGlvbicpLnRleHQocGllY2UuZGVzY3JpcHRpb24pO1xuXHRcdFx0Y29uc3QgJGltZyA9ICQoJzxpbWc+JykuYXR0cignc3JjJywgaW1nKTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKGFsbE1hcnZlbC5sZW5ndGgpO1xuXHRcdFx0JCgnI2NvbnRlbnQnKS5hcHBlbmQoJHRpdGxlLCAkZGVzY3JpcHRpb24sICRpbWcpO1xuXHRcdFx0JCgnaW5wdXRbdHlwZT10ZXh0XScpLnZhbCgnJyk7XG5cdFx0fSk7XG5cdH07XG59O1xuXG5tYXJ2ZWwuaW5pdCA9ICgpID0+IHtcblx0bWFydmVsLmdldE1hcnZlbCgnJyk7XG5cdCQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHQkKCcjY29udGVudCcpLmVtcHR5KCk7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHQvLyBjb25zb2xlLmxvZygnY2hhbmdlZCcpO1xuXHRcdGNvbnN0IGNoYXJhY3RlciA9ICQoJ2lucHV0W3R5cGU9dGV4dF0nKS52YWwoKTtcblx0XHQvLyBjb25zb2xlLmxvZyhjaGFyYWN0ZXIpO1xuXHRcdG1hcnZlbC5nZXRNYXJ2ZWwoY2hhcmFjdGVyKTtcblx0XHRjb25zdCAkbG9hZGluZyA9ICQoJzxoMT4nKS50ZXh0KCdMb2FkaW5nLiAuIC4nKVxuXHRcdCQoJyNjb250ZW50JykuYXBwZW5kKCRsb2FkaW5nKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJ2gxJykuaGlkZSgpO1xuXHRcdH0sIDIwMDAwKTtcblx0fSk7XG59O1xuXG4kKGZ1bmN0aW9uKCl7XG5cdG1hcnZlbC5pbml0KCk7XG59KTsiXX0=
