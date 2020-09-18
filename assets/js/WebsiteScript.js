function navbarResize() {
	var x = document.getElementById("nav");
	if (x.className === "navigation") {
		x.className += " responsive";
	} else {
		x.className = "navigation";
	}
}

