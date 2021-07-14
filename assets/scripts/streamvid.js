//initialize and set player settings
var streamPlayer = videojs('stream-player', {
	controls: false,
	autoplay: false,
	preload: 'auto',
	loop: true,
	fill: true,
});

videojs.addLanguage('en', {
	'The media could not be loaded, either because the server or network failed or because the format is not supported.':
		"Could not load the stream. Either it's offline or there is some error.",
});

streamPlayer.on('error', function () {
	console.log(streamPlayer.error());
	overlayTextChanger(OFFLINE_TEXT);
});

// SOURCE - Random Video
function randomVidSrc() {
	streamPlayer.src({
		type: 'video/mp4',
		//16:18 (1920x2160) VIDEO URL
		src: 'https://td.l1.io/assets/images/vid.mp4',
	});
	streamPlayer.on('canplay', function () {
		console.log('Ready to play');
		overlayTextChanger(READY_TEXT);
	});
}
// SOURCE - Stream Link
function streamLinkSrc() {
	streamPlayer.src({
		type: 'application/x-mpegURL',
		//URL FOR HLS STREAM
		src:	'https://stream.mux.com/01XOFKYxruNiuniKekmx43mOm84Q3krYHdo7YsCLKJus.m3u8',
	});
	streamPlayer.ready(function () {
		console.log('Player ready');
		overlayTextChanger(READY_TEXT);
	});
	
}
srcChanger();

//Loading Spinner
const loadingSpinner = document.querySelector('.vjs-loading-spinner');
loadingSpinner.classList.add('loading-spinner-top');
