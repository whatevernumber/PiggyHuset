<div class="citrus_loading" role="img"></div>

<style>
.citrus_loading {
	width: 50px;
	height: 70px;
	background-image: url("/src/lib/img/citrus.png");
	background-size: cover;
	animation: 1s infinite loading;
}

@keyframes loading {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>