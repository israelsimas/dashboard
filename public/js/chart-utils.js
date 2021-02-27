'use strict';

var coordinatesX = new Array();
var coordinatesY = new Array();

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

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

function updatePercent() {
	var config = {
		type: 'pie',
		data: {
			datasets: [{
				data: [
					10,
					16,
					30,
				],
				backgroundColor: [
					window.chartColors.red,
					window.chartColors.orange,
					window.chartColors.yellow,
				],
				label: 'Dataset 1'
			}],
			labels: [
				'Red',
				'Orange',
				'Yellow'
			]
		},
		options: {
			responsive: true
		}
	};

	var ctx = document.getElementById('canvas-pie').getContext('2d');
	window.myPieChart = new Chart(ctx, config);
}

function loadCoordinates() {
	fetch('http://127.0.0.1:3000/api/coordinates')
	.then(response => response.json())
	.then(data => {
		for (var i = 0; i < data.length; i++) {
			var coord = data[i];
			coordinatesX[coordinatesX.length] = coord.x;
			coordinatesY[coordinatesY.length] = coord.y;
		}

		updateCoordinates();
	})
	.catch(error => console.error(error));
}

function loadPercent() {
	fetch('http://127.0.0.1:3000/api/coordinates')
	.then(response => response.json())
	.then(data => {
		updatePercent();
	})
	.catch(error => console.error(error));
}


loadCoordinates();
loadPercent() 

function getCoordY(i) {
	return coordinatesY[i];
}
