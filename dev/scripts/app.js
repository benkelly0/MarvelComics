const marvel = {};

const ts = new Date().getTime();
const privateKey = '751726e3c08cb5df4b6899d41abba79a1294c429';
const publicKey = 'ee31870724710eb9b3d32cf88e49b9b3';
const hash = CryptoJS.MD5(ts+privateKey+publicKey).toString();

marvel.getMarvel = (query) => {
	
		$.ajax({
			url: 'http://gateway.marvel.com/v1/public/comics',
			method: 'GET',
			dataType: 'json',
			data:{
				ts: ts,
				apikey: publicKey,
				hash: hash,
				title: query
			}
	}).then((res) => {
		// console.log(res.data.results);
		marvel.displayMarvel(res.data.results);
	});
};

marvel.displayMarvel = (allMarvel) => {
	// console.log(allMarvel);
	// console.log(allMarvel.length);
	const $noChar = $('<h2>').text('This character does not exist in this database!');
	if (allMarvel.length === 0) {
		$('#content').empty();
		$('#content').append($noChar);
		setTimeout(function () {
			$('h2').hide();
		}, 2000);
	}else{
		$('#content').empty();
		allMarvel.filter((marvelPiece) => {
			// console.log(marvelPiece);
			return marvelPiece != null;
		}).forEach((piece) =>{
			// console.log(piece);
			const img = `${piece.images[0].path}.${piece.images[0].extension}`;
			const $title = $('<h2>').text(piece.title);
			const $description = $('<p>').addClass('description').text(piece.description);
			const $img = $('<img>').attr('src', img);
			// console.log(allMarvel.length);
			$('#content').append($title, $description, $img);
			$('input[type=text]').val('');
		});
	};
};

marvel.init = () => {
	marvel.getMarvel('');
	$('form').on('submit', function(event) {
		$('#content').empty();
		event.preventDefault();
		// console.log('changed');
		const character = $('input[type=text]').val();
		// console.log(character);
		marvel.getMarvel(character);
		const $loading = $('<h1>').text('Loading. . .')
		$('#content').append($loading);
		setTimeout(function () {
			$('h1').hide();
		}, 20000);
	});
};

$(function(){
	marvel.init();
});