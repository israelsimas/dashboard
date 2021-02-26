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
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: coordinatesY,
				
			}, {
				label: 'Budget',
				fill: false,
				backgroundColor: 'rgb(54, 162, 235)',
				borderColor: 'rgb(54, 162, 235)',
				data: [
					getCoordY(9) + 2,
					getCoordY(8) + 2,
					getCoordY(7) + 2,
					getCoordY(6) + 2,
					getCoordY(5) + 2,
					getCoordY(4) + 2,
					getCoordY(3) + 2,
					getCoordY(2) + 2,
					getCoordY(1) + 2,
					getCoordY(0) + 2
				],
			}]
		},
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
