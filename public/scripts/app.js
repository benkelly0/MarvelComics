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
		console.log(res.data.results);
		marvel.displayMarvel(res.data.results);
	});
};

marvel.displayMarvel = function (allMarvel) {
	// console.log(allMarvel);
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
		$('#content').append($title, $description, $img);
		$('input[type=text]').val('');
	});
};

marvel.init = function () {
	marvel.getMarvel('marvel');
	$('form').on('submit', function (event) {
		event.preventDefault();
		// console.log('changed');
		var character = $('input[type=text]').val();
		// console.log(character);
		marvel.getMarvel(character);
	});
};

$(function () {
	marvel.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sU0FBUyxFQUFmOztBQUVBLElBQU0sS0FBSyxJQUFJLElBQUosR0FBVyxPQUFYLEVBQVg7QUFDQSxJQUFNLGFBQWEsMENBQW5CO0FBQ0EsSUFBTSxZQUFZLGtDQUFsQjtBQUNBLElBQU0sT0FBTyxTQUFTLEdBQVQsQ0FBYSxLQUFHLFVBQUgsR0FBYyxTQUEzQixFQUFzQyxRQUF0QyxFQUFiOztBQUVBLE9BQU8sU0FBUCxHQUFtQixVQUFDLEtBQUQsRUFBVztBQUM1QixHQUFFLElBQUYsQ0FBTztBQUNOLE9BQUssNENBREM7QUFFTixVQUFRLEtBRkY7QUFHTixZQUFVLE1BSEo7QUFJTixRQUFLO0FBQ0osT0FBSSxFQURBO0FBRUosV0FBUSxTQUZKO0FBR0osU0FBTSxJQUhGO0FBSUosVUFBTztBQUpIO0FBSkMsRUFBUCxFQVVFLElBVkYsQ0FVTyxVQUFDLEdBQUQsRUFBUztBQUNoQixVQUFRLEdBQVIsQ0FBWSxJQUFJLElBQUosQ0FBUyxPQUFyQjtBQUNBLFNBQU8sYUFBUCxDQUFxQixJQUFJLElBQUosQ0FBUyxPQUE5QjtBQUNBLEVBYkE7QUFjRCxDQWZEOztBQWlCQSxPQUFPLGFBQVAsR0FBdUIsVUFBQyxTQUFELEVBQWU7QUFDckM7QUFDQSxHQUFFLFVBQUYsRUFBYyxLQUFkO0FBQ0EsV0FBVSxNQUFWLENBQWlCLFVBQUMsV0FBRCxFQUFpQjtBQUNqQztBQUNBLFNBQU8sZUFBZSxJQUF0QjtBQUNBLEVBSEQsRUFHRyxPQUhILENBR1csVUFBQyxLQUFELEVBQVU7QUFDcEI7QUFDQSxNQUFNLE1BQVMsTUFBTSxNQUFOLENBQWEsQ0FBYixFQUFnQixJQUF6QixTQUFpQyxNQUFNLE1BQU4sQ0FBYSxDQUFiLEVBQWdCLFNBQXZEO0FBQ0EsTUFBTSxTQUFTLEVBQUUsTUFBRixFQUFVLElBQVYsQ0FBZSxNQUFNLEtBQXJCLENBQWY7QUFDQSxNQUFNLGVBQWUsRUFBRSxLQUFGLEVBQVMsUUFBVCxDQUFrQixhQUFsQixFQUFpQyxJQUFqQyxDQUFzQyxNQUFNLFdBQTVDLENBQXJCO0FBQ0EsTUFBTSxPQUFPLEVBQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsS0FBaEIsRUFBdUIsR0FBdkIsQ0FBYjtBQUNBLElBQUUsVUFBRixFQUFjLE1BQWQsQ0FBcUIsTUFBckIsRUFBNkIsWUFBN0IsRUFBMkMsSUFBM0M7QUFDQSxJQUFFLGtCQUFGLEVBQXNCLEdBQXRCLENBQTBCLEVBQTFCO0FBQ0EsRUFYRDtBQVlBLENBZkQ7O0FBaUJBLE9BQU8sSUFBUCxHQUFjLFlBQU07QUFDbkIsUUFBTyxTQUFQLENBQWlCLFFBQWpCO0FBQ0EsR0FBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBUyxLQUFULEVBQWdCO0FBQ3RDLFFBQU0sY0FBTjtBQUNBO0FBQ0EsTUFBTSxZQUFZLEVBQUUsa0JBQUYsRUFBc0IsR0FBdEIsRUFBbEI7QUFDQTtBQUNBLFNBQU8sU0FBUCxDQUFpQixTQUFqQjtBQUNBLEVBTkQ7QUFPQSxDQVREOztBQVdBLEVBQUUsWUFBVTtBQUNYLFFBQU8sSUFBUDtBQUNBLENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBtYXJ2ZWwgPSB7fTtcblxuY29uc3QgdHMgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbmNvbnN0IHByaXZhdGVLZXkgPSAnNzUxNzI2ZTNjMDhjYjVkZjRiNjg5OWQ0MWFiYmE3OWExMjk0YzQyOSc7XG5jb25zdCBwdWJsaWNLZXkgPSAnZWUzMTg3MDcyNDcxMGViOWIzZDMyY2Y4OGU0OWI5YjMnO1xuY29uc3QgaGFzaCA9IENyeXB0b0pTLk1ENSh0cytwcml2YXRlS2V5K3B1YmxpY0tleSkudG9TdHJpbmcoKTtcblxubWFydmVsLmdldE1hcnZlbCA9IChxdWVyeSkgPT4ge1xuXHRcdCQuYWpheCh7XG5cdFx0XHR1cmw6ICdodHRwOi8vZ2F0ZXdheS5tYXJ2ZWwuY29tL3YxL3B1YmxpYy9jb21pY3MnLFxuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRkYXRhOntcblx0XHRcdFx0dHM6IHRzLFxuXHRcdFx0XHRhcGlrZXk6IHB1YmxpY0tleSxcblx0XHRcdFx0aGFzaDogaGFzaCxcblx0XHRcdFx0dGl0bGU6IHF1ZXJ5XG5cdFx0XHR9XG5cdH0pLnRoZW4oKHJlcykgPT4ge1xuXHRcdGNvbnNvbGUubG9nKHJlcy5kYXRhLnJlc3VsdHMpO1xuXHRcdG1hcnZlbC5kaXNwbGF5TWFydmVsKHJlcy5kYXRhLnJlc3VsdHMpO1xuXHR9KTtcbn07XG5cbm1hcnZlbC5kaXNwbGF5TWFydmVsID0gKGFsbE1hcnZlbCkgPT4ge1xuXHQvLyBjb25zb2xlLmxvZyhhbGxNYXJ2ZWwpO1xuXHQkKCcjY29udGVudCcpLmVtcHR5KCk7XG5cdGFsbE1hcnZlbC5maWx0ZXIoKG1hcnZlbFBpZWNlKSA9PiB7XG5cdFx0Ly8gY29uc29sZS5sb2cobWFydmVsUGllY2UpO1xuXHRcdHJldHVybiBtYXJ2ZWxQaWVjZSAhPSBudWxsO1xuXHR9KS5mb3JFYWNoKChwaWVjZSkgPT57XG5cdFx0Ly8gY29uc29sZS5sb2cocGllY2UpO1xuXHRcdGNvbnN0IGltZyA9IGAke3BpZWNlLmltYWdlc1swXS5wYXRofS4ke3BpZWNlLmltYWdlc1swXS5leHRlbnNpb259YDtcblx0XHRjb25zdCAkdGl0bGUgPSAkKCc8aDI+JykudGV4dChwaWVjZS50aXRsZSk7XG5cdFx0Y29uc3QgJGRlc2NyaXB0aW9uID0gJCgnPHA+JykuYWRkQ2xhc3MoJ2Rlc2NyaXB0aW9uJykudGV4dChwaWVjZS5kZXNjcmlwdGlvbik7XG5cdFx0Y29uc3QgJGltZyA9ICQoJzxpbWc+JykuYXR0cignc3JjJywgaW1nKTtcblx0XHQkKCcjY29udGVudCcpLmFwcGVuZCgkdGl0bGUsICRkZXNjcmlwdGlvbiwgJGltZyk7XG5cdFx0JCgnaW5wdXRbdHlwZT10ZXh0XScpLnZhbCgnJyk7XG5cdH0pO1xufTtcblxubWFydmVsLmluaXQgPSAoKSA9PiB7XG5cdG1hcnZlbC5nZXRNYXJ2ZWwoJ21hcnZlbCcpO1xuXHQkKCdmb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHQvLyBjb25zb2xlLmxvZygnY2hhbmdlZCcpO1xuXHRcdGNvbnN0IGNoYXJhY3RlciA9ICQoJ2lucHV0W3R5cGU9dGV4dF0nKS52YWwoKTtcblx0XHQvLyBjb25zb2xlLmxvZyhjaGFyYWN0ZXIpO1xuXHRcdG1hcnZlbC5nZXRNYXJ2ZWwoY2hhcmFjdGVyKTtcblx0fSk7XG59O1xuXG4kKGZ1bmN0aW9uKCl7XG5cdG1hcnZlbC5pbml0KCk7XG59KTsiXX0=
