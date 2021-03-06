var socket = io.connect();
let online = null;
let userList = [];
let speakOnly = false;
let usrCol = {};
let charLim;

socket.on("groovy", (data) => {
	charLim = parseInt(data.charLim);
	if (charLim === 0) {
		charLim = 255;
	}
	document.getElementById("bot").style.display = "initial";
});

socket.on("refresh", (data) => {
	if (data.gid === online) {
		window.location.reload();
	}
});

socket.on("NOWPLAYING", (data) => {
	console.log(charLim);
	const elem = document.getElementById("nowPlay");
	let text = data.sng;
	if (text.length >= charLim) {
		t1 = text.substring(0, charLim);
		t1 += "...";
		text = t1;
	}
	elem.innerText = text;
});
