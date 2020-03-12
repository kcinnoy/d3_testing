// set the dimensions and margins of the graph

const chartSize = document.querySelector('.lineChart');

const height = parseInt(getComputedStyle(chartSize).height);
const width = parseInt(getComputedStyle(chartSize).width);

const svg = d3.select('svg')

const margin = {top: 20, right: 20, bottom: 30, left: 50},
    chartHeight = height - margin.top - margin.bottom,
    chartWidth = width - margin.left - margin.right;
   

// parse the date / time
let parseTime = d3.timeParse('%d-%b-%y');
let formatTime = d3.timeFormat('%d/%b/%y')

// set the ranges
let x = d3.scaleTime().range([0, chartWidth]);
let y = d3.scaleLinear().range([chartHeight, 0]);

// define the line
let valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
const g = svg.append('g')
    .attr('transform', `translate(${margin.left }, ${margin.top})`);

// Get the data
d3.csv("data.csv").then(function(data) {
  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
      console.log(d.date)
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

  // Add the valueline path.
  g.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  g.append("g")
      .attr("transform", "translate(0," + chartHeight + ")")
      .call(d3.axisBottom(x)
        .tickFormat(formatTime));

  // Add the Y Axis
  g.append("g")
      .call(d3.axisLeft(y));


});