let viewModeIsAR = true; //true = Augmented Reality | false = Reality
let srcVideo = 0; //SET TO 0 TO SHOW STREAM FIRST - SET TO 1 TO SHOW VIDEO FIRST
let overlayVisible = true;

//Overlay Text
const LOADING_TEXT = 'Stream Loading...';
const READY_TEXT = 'Ready, Click Play!';
const OFFLINE_TEXT = 'The stream is offline!';

//Initial Load
updateButtonText();
overlayVisibileSwitcher(overlayVisible);

//logical switch of view mode
function switchViewMode() {
	viewModeIsAR = !viewModeIsAR;

	updateButtonText();
	switchViewModeCSS();
}

//change dom css for playerDiv
function switchViewModeCSS() {
	if (viewModeIsAR) {
		playerDiv.classList.add('mode-ar');
		loadingSpinner.classList.add('loading-spinner-top');
		playerDiv.classList.remove('mode-r');
		loadingSpinner.classList.remove('loading-spinner-bottom');
	} else {
		playerDiv.classList.add('mode-r');
		loadingSpinner.classList.add('loading-spinner-bottom');
		playerDiv.classList.remove('mode-ar');
		loadingSpinner.classList.remove('loading-spinner-top');
	}
}

//update switch button text so show next mode
function updateButtonText() {
	if (viewModeIsAR) {
		switchBtn.innerHTML = '<i class="far fa-eye"></i>';
		switchBtn.title = 'Switch to Reality';
	} else {
		switchBtn.innerHTML = '<i class="fas fa-vr-cardboard"></i>';
		switchBtn.title = 'Switch to Augmented';
	}
}

// FULL SCREEN
function toggleFullScreen() {
	if (!screenfull.isFullscreen) {
		screenfull.request(container);
		maxScreenBtn.innerHTML = '<i class="fas fa-compress-arrows-alt"></i>';
		maxScreenBtn.title = 'Exit Fullscreen';
	} else {
		screenfull.exit();
		maxScreenBtn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
		maxScreenBtn.title = 'Fullscreen';
	}
}

//Video Controls - CONFIG FOR ALL THE BUTTONS

//Play Btn
function playVid() {
	if (overlayVisible) {
		overlayVisibileSwitcher(false);
	}

	if (streamPlayer.paused()) {
		streamPlayer.play();
		playVidBtn.innerHTML = '<i class="fas fa-pause"></i>';
		playVidBtn.title = 'Pause';
	} else {
		streamPlayer.pause();
		playVidBtn.innerHTML = '<i class="fas fa-play"></i>';
		playVidBtn.title = 'Play';
	}
}

//Mute Btn
function muteVid() {
	let isVolumeMuted = streamPlayer.muted();
	if (isVolumeMuted) {
		streamPlayer.muted(false);
		muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
		muteBtn.title = 'Mute';
	} else {
		streamPlayer.muted(true);
		muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
		muteBtn.title = 'Unmute';
	}
}

//Reset Player Overlay
function resetPlayer() {
	overlayVisibileSwitcher(true);
	overlayTextChanger(LOADING_TEXT);
	playVidBtn.innerHTML = '<i class="fas fa-play"></i>';
	playVidBtn.title = 'Play';
}

//Change Source
function srcChanger() {
	switch (srcVideo) {
		case 0:
			resetPlayer();
			streamLinkSrc();
			break;
		case 1:
			resetPlayer();
			randomVidSrc();
			break;
	}
}

// Toggle Overlay
function overlayVisibileSwitcher(visible) {
	switch (visible) {
		case true:
			overlayBox.style.opacity = '1';
			overlayVisible = true;
			break;
		case false:
			overlayBox.style.opacity = '0';
			overlayVisible = false;
			break;
	}
}

//Change Overlay text
function overlayTextChanger(overlayText) {
	overlayTextOne.innerHTML = overlayText;
	overlayTextTwo.innerHTML = overlayText;
}

//Video Controls Section
function flashControls() {
	controlsDiv.classList.remove('controls-animation');
	controlsDiv.offsetHeight;
	controlsDiv.classList.add('controls-animation');
}

//HANDLERS
function switchBtnHandler() {
	switchViewMode();
}

function fullScreenBtnHandler() {
	toggleFullScreen();
}

function playBtnHandler() {
	playVid();
}

function srcChangeHandler() {
	srcVideo === 0 ? (srcVideo = 1) : (srcVideo = 0);
	srcChanger();
}

function muteBtnHandler() {
	muteVid();
}

function playerDivClickHandler() {
	flashControls();
}

//Event listners
switchBtn.addEventListener('click', switchBtnHandler);
maxScreenBtn.addEventListener('click', fullScreenBtnHandler);
playVidBtn.addEventListener('click', playBtnHandler);
srcChangeBtn.addEventListener('click', srcChangeHandler);
muteBtn.addEventListener('click', muteBtnHandler);
overlayBox.addEventListener('click', playerDivClickHandler);
