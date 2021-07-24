// Live Audio Looping Software

let recording = false;

// initilize audio recording variables
let audioRecorder;
let dataArray = [];
let audio;
let loops = [];

// get audio input device
let audioIN = {audio:true};
navigator.mediaDevices.getUserMedia(audioIN).then(function (audioInputObject) {
	console.log('audio device is ready to record');

	//let audio = document.querySelector('audio');
	//audio.srcObject = audioInputObject;

	audioRecorder = new MediaRecorder(audioInputObject);

	audioRecorder.ondataavailable = function (e) {
		console.log(e);
		dataArray.push(e.data);

		let audioData = new Blob(dataArray, {'type':'audio/mp3;'});

		dataArray = [];

		let audioSrc = window.URL.createObjectURL(audioData);

		audio = new Audio(audioSrc);
		audio.addEventListener('ended', function() {
			this.currentTime = .005;
			this.play();
			//console.log('loop that shit');
		}, false);
		audio.play();
		loops.push(audio);
	}

	audioRecorder.onstop = function (e) {
		/*let audioData = new Blob(dataArray, {'type':'audio/mp3;'});

		dataArray = [];

		let audioSrc = window.URL.createObjectURL(audioData);

		audio = new Audio(audioSrc);
		audio.addEventListener('ended', function() {
			this.currentTime = .005;
			this.play();
			//console.log('loop that shit');
		}, false);
		audio.play();
		loops.push(audio);*/
	}
	
});

function onRecordClick(e) {
	if (!recording) {
		// on first click start recording
		audioRecorder.start();
		recording = true;
	}
	else {
		// on second click stop recording
		audioRecorder.stop();
		recording = false;
		console.log(audioRecorder);
	}
}

function onDeleteClick(e) {
	if (loops.length !== 0) {
		loops[loops.length-1].pause();
		loops.pop();
	}
}
