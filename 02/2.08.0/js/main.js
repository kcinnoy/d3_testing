/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json("data/buildings.json").then((data) => {
  data.forEach((d) => {
    d.height = +d.height;
  });

  let svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 500);

  let rects = svg.selectAll("rect")
    .data(data);

  rects.enter().append("rect")
    .attr("x", (d, i)=> {
      return (i * 50) + 25;
    })
    .attr("y", 10)
    .attr("height", (d) =>{
      return d.height
    })
    .attr("width", 20)
    .attr("fill", "blue")
}).catch(function(error){
  console.log(error)
});