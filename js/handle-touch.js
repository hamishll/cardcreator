
let xStart = 0;
let xEnd = 0;
let swipeDirection = 0;

document.querySelectorAll('.paper').forEach(item => {

	item.addEventListener("touchstart", function(e) {
		xStart = e.touches[0].screenX;
		//console.log(xStart);
	}, true);

	item.addEventListener("touchmove", function(e2) {
		xEnd = e2.touches[0].screenX;
		swipeDirection = xEnd - xStart;
		//console.log(xEnd - xStart);
	}, true);
	
	item.addEventListener("touchend", function(e3) {
		if (swipeDirection > 20) {
			console.log("Swiped " + swipeDirection);
			var mouseEvent = new MouseEvent("mousedown", {});
			item.dispatchEvent(mouseEvent);
		}
		else if (swipeDirection < -20) {
			console.log("Swiped " + swipeDirection);
			var mouseEvent = new MouseEvent("mousedown", {});
			item.dispatchEvent(mouseEvent);
		}
		else {}
	});

});