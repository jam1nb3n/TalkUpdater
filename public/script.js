var socket = io.connect();
let online = null;

socket.on("update", (msg) => {
	if (msg.guid === online) {
		if (msg.speaking === true) {
			console.log(msg.id + " speaking");
			const user = document.getElementById(msg.id);
			user.style.border = "5px solid red";
		} else {
			const user = document.getElementById(msg.id);
			user.style.border = "5px solid black";
			console.log(msg.id + " not speaking");
		}
	}
});

socket.on("users", (data) => {
	const user = data.data;
	const gid = data.gid;
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const param1 = urlParams.get("id");

	if (gid !== param1) return;
	online = data.guid;
	console.log(user);
	var list = document.getElementById("mainL");
	list.innerHTML = "";
	user.forEach((user) => {
		const listItem = document.createElement("li");

		const image = document.createElement("img");
		image.setAttribute("src", user.avatar);
		image.setAttribute("alt", user.name);
		image.style.border = "5px solid black";
		image.id = user.id;
		listItem.appendChild(image);

		const name = document.createElement("p");
		name.innerText = user.name;
		name.style.color = user.nameCol;
		listItem.appendChild(name);

		var list = document.getElementById("mainL");
		list.appendChild(listItem);
	});
});

socket.on("flip", () => {
	console.log("yeet");
	const main = document.getElementById("mainL");
	if (main.style.float == "right") {
		main.style.float = "left";
	} else {
		main.style.float = "right";
	}
});

socket.on("refresh", (data) => {
	if (data.gid === online) {
		window.location.reload();
	}
});

const test = () => {
	const listItem = document.createElement("li");

	const image = document.createElement("img");
	image.setAttribute(
		"src",
		"https://cdn.discordapp.com/avatars/231427823275868160/8b6208e57a4cb0b7a257c74eacf7dbdd.webp"
	);
	image.setAttribute("alt", "jam1nb3n");
	image.id = 12;
	listItem.appendChild(image);

	const name = document.createElement("p");
	name.innerText = "jam1nb3n";
	listItem.appendChild(name);

	var list = document.getElementById("mainL");
	list.appendChild(listItem);
};
