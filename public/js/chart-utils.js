'use strict';

var coordinatesX = new Array();
var coordinatesY = new Array();

function updateCoordinates() {
	var config = {
		type: 'line',
		data: {
			labels: coordinatesX,
			datasets: [{
				label: 'Price',
				fill: false,
				backgroundColor: 'rgb(54, 162, 235)',
				borderColor: 'rgb(54, 162, 235)',
				data: coordinatesY,
				borderWidth: 3
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	};

	var ctx = document.getElementById('canvas').getContext('2d');
	window.mychart = new Chart(ctx, config);
}

function loadCoordinates() {
	fetch('http://127.0.0.1:3000/api/coordinates')
	.then(response => response.json())
	.then(data => {
		console.log(data);
		for (var i = 0; i < data.length; i++) {
			var coord = data[i];
			coordinatesX[coordinatesX.length] = coord.x;
			coordinatesY[coordinatesY.length] = coord.y;
		}

		updateCoordinates();
	})
	.catch(error => console.error(error));
}

loadCoordinates();

function getCoordY(i) {
	return coordinatesY[i];
}
