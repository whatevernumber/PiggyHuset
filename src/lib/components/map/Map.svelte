<script>
	import L from 'leaflet';
	import { onMount } from 'svelte';

	export let clinics = [];

	const statusColors = {
		1: {
			color: '#f4f4f4',
			type: 'Отзывы отсутствуют',
			class: 'white'
		},
		2: {
			color: '#fff100',
			type: 'Недостаточно данных',
			class: 'yellow'
		},
		3: {
			color: '#37ce2e',
			type: 'Много хороших отзывов',
			class: 'green'
		},
		4: {
			color: '#f8792e',
			type: 'Единичный отрицательный отзыв',
			class: 'orange'
		},
		5: {
			color: '#eb3443',
			type: 'Много отрицательных отзывов',
			class: 'red'
		}
	};

	onMount(() => {
		initialize();
	});

	const initialize = () => {
		let initialCoords = [
			55.755878, 37.639778
		];

		let savedCoords = JSON.parse(localStorage.getItem('coords'));

		if (savedCoords) {
			initialCoords = [
				savedCoords.lat, savedCoords.lng
			];
		}

		createMap(initialCoords);
	};

	const createMap = (initialCoords) => {
		let map = L.map('map', { attributionControl: false }).setView(initialCoords, 13);

		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			maxZoom: 25,
			attribution: ''
		}).addTo(map);

		if (clinics.length) {
			clinics.forEach((clinic) => {
				handleDetails(clinic, map);
			});
		}

		map.on('move', () => {
			let coords = map.getCenter();
			localStorage.setItem('coords', JSON.stringify({ lat: coords.lat, lng: coords.lng }));
		})
	};

	const handleDetails = (clinic, map) => {

		let color = pickColor(clinic.feedback_status_id ?? 1);

		const svg = `<svg width="50px" height="50px" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#D97544;}.cls-2{fill:#ffffff;}.cls-4{fill:#576065;}</style></defs><title>map-pointer-house</title><g id="map-pointer-house"><g id="map-pointer-house-2"><g id="fill"><path class="cls-1" d="M74.26,31C74.26,49.77,51.75,88.2,45,88.2S15.74,49.77,15.74,31a29.26,29.26,0,0,1,58.52,0Z"/><circle class="cls-2" cx="45" cy="32.2" r="18.78"/><circle class="cls-3" cx="45" cy="32.2" r="12.78" fill="${color['color']}"/></g><g id="outline"><path class="cls-4" d="M45,90c-8.43,0-31.06-39.82-31.06-59a31.06,31.06,0,0,1,62.12,0C76.06,50.18,53.43,90,45,90ZM45,3.6A27.45,27.45,0,0,0,17.54,31c0,19,22.32,55.38,27.46,55.43S72.46,49.95,72.46,31A27.45,27.45,0,0,0,45,3.6Z"/></g></g></g></svg>`;

		let divIcon = L.divIcon({
			className: 'normal_icon',
			html: svg,
			bgPos: [100, 250]
		});

		let marker = L.marker([clinic.latitude, clinic.longitude], { icon: divIcon }).addTo(map);

		let string = buildDetails(clinic, color);
		let popup = L.popup([clinic.latitude, clinic.longitude], { content: string, offset: L.point(0, -50) });
		marker.bindPopup(popup);
	};

	const pickColor = (status) => {
		return statusColors[status];
	};

	const buildDetails = (clinic, color) => {

		let address = `<div class="clinic_wrapper"><div class="feedback_status ${color.class}"></div><div class="clinic_title"><p>${clinic.title}</p></div></div><p class="clinic_address">${clinic.address}</p>`;

		let list = '';

		clinic.vets.forEach((vet) => {
			let vetStatusClass = '';

			if (vet.feedback_status_id) {
				vetStatusClass += 'vet_feedback_status ' + pickColor(vet.feedback_status_id).class;
			}

			list += '<li class="vet">' + '<span class="' + vetStatusClass + '">' + vet.name + '</span>' + '</li>';
		});

		if (list.length) {
			list = '<p class="vets_header">Врачи:</p><ul class="vet_list">' + list + '</ul>';
		}

		return `<div class="main_address">${address}</div><div class="main_vets">${list}</div>`;
	};
</script>

<div id="map">
</div>
<div class="map_legend">
	<div>
		<ul class="legend_list">
			{#each Object.entries(statusColors) as [key, status]}
				<li class="legend_list_element">
					<div class="feedback_status {status.class}"></div>
					<div>
						{status.type}
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
    #map {
        height: 500px;
		border: 4px solid white;
    }

    .legend_list {
        padding: 25px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        column-gap: 15px;
        row-gap: 15px;
        list-style: none;
        background: #FFFFFF;
		font-size: medium;
    }

    .legend_list_element {
        display: flex;
        align-items: center;
        column-gap: 15px;
    }

    :global(.normal_icon svg) {
        translate: -20px -45px;
    }

    :global(.main_address p) {
        margin: 0 0 0;
    }

    :global(.clinic_title) {
        width: 260px;
        text-transform: capitalize;
        font-size: 14px;
        font-weight: bold;
        font-family: Jost, sans-serif;
    }

    :global(.main_address p.clinic_address) {
        color: #c7cfdc;
        font-size: 12px;
        margin-bottom: 20px;
    }

    :global(p.vets_header) {
        margin: 0 0 5px;
    }

    :global(.main_vets) {
        font-family: Jost, sans-serif;
        font-size: 14px;
    }

    :global(.clinic_wrapper, .clinic_address) {
        font-family: Jost, sans-serif;
    }

    :global(.vet_list) {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
        list-style: none;
        margin: 5px 0;
        padding: 0;
    }

    :global(.clinic_wrapper) {
        display: flex;
        column-gap: 10px;
        align-items: center;
        margin-bottom: 15px;
    }

    :global(.vet) {
        position: relative;
        padding: 0 10px 0 25px;
    }

    :global(.vet:before) {
        content: '';
        position: absolute;
        top: -2px;
        left: 0;
        width: 20px;
        height: 20px;
        background: url('/img/maus.png') no-repeat;
        background-size: cover;
    }

    :global(.vet_feedback_status) {
        position: relative;
    }

	:global(.vet_feedback_status:after) {
		content: '';
		position: absolute;
		top: 5px;
		right: -20px;
        width: 10px;
        height: 10px;
        border: 1px solid #c7cfdc;
        border-radius: 50%;
	}

    :global(.feedback_status) {
        width: 25px;
        height: 25px;
        border: 1px solid #c7cfdc;
        border-radius: 50%;
    }

    :global(.feedback_status.white, .vet_feedback_status.white:after) {
        background-color: #f4f4f4;
    }

    :global(.feedback_status.yellow, .vet_feedback_status.yellow:after) {
        background-color: #fff100;
    }

    :global(.feedback_status.orange, .vet_feedback_status.orange:after) {
        background-color: #f8792e;
    }

    :global(.feedback_status.red, .vet_feedback_status.red:after) {
        background-color: #eb3443;
    }

    :global(.feedback_status.green, .vet_feedback_status.green:after) {
        background-color: #37ce2e;
    }

	@media (max-width: 760px) {
        :global(.clinic_title) {
            width: 200px;
        }

        .legend_list {
            justify-content: left;
			flex-direction: column;
        }
	}

	@media (min-width: 712px) and (max-width: 1320px) {
		.legend_list {
			justify-content: center;
		}
	}
</style>