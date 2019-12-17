/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.4 - Adding SVGs with D3
*/

// var svg = d3.select("#chart-area").append("svg")
// 	.attr("width", 400)
// 	.attr("height", 400);

// var circle = svg.append("circle")
// 	.attr("cx", 100)
// 	.attr("cy", 250)
// 	.attr("r", 70)
// 	.attr("fill", "red");

let svg = d3.select("#chart-area").append("svg")
	.attr("width", 500)
	.attr("height", 500)
	.style("stroke", "black")

let circle = svg.append("circle")
	.attr("cx", 100)
	.attr("cy", 250)
	.attr("r", 100)
	.attr("fill", "blue");

let rect = svg.append("rect")
	.attr("x", 250)
	.attr("y", 10)
	.attr("width", 150)
	.attr("height", 50)
	.attr("fill", "red");


		