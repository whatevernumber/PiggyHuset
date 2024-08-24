export const addParallaxEffect = function(selector, maxTilt = 0.5) {
	let cards = document.querySelectorAll(selector);

	for (const card of cards) {
		card.onmousemove = (evt) => transformPanel(evt, card);
		card.onmouseenter = () => handleMouseEnter(card);
		card.onmouseleave = () => handleMouseLeave(card);

		card.style.transformStyle = 'preserve-3d';
		card.style.willChange = 'transform';
	}

	let mouseX, mouseY;

	function transformPanel(mouseEvent, card) {
		mouseX = mouseEvent.pageX;
		mouseY = mouseEvent.pageY;

		const centerX = card.offsetLeft + card.clientWidth / 2;
		const centerY = card.offsetTop + card.clientHeight / 2;

		const percentX = (mouseX - centerX) / (card.clientWidth / 2);
		const percentY = -((mouseY - centerY) / (card.clientHeight / 2));

		card.style.transform = "perspective(400px) rotateY(" + percentX * maxTilt + "deg) rotateX(" + percentY * maxTilt + "deg)";
	}

	function handleMouseEnter(card) {
		setTimeout(() => {
			card.style.transition = "";
		}, 100);
		card.style.transition = "transform 0.1s";
	}

	function handleMouseLeave(card) {
		card.style.transition = "transform 0.1s";
		setTimeout(() => {
			card.style.transition = "";
		}, 100);

		card.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg)";
	}
}