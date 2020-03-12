// set the dimensions and margins of the graph

const chartSize = document.querySelector('.lineChart');

const height = parseInt(getComputedStyle(chartSize).height);
const width = parseInt(getComputedStyle(chartSize).width);

const svg = d3.select('#lineChart-1')

const margin = {top: 20, right: 20, bottom: 30, left: 50},
    chartHeight = height - margin.top - margin.bottom,
    chartWidth = width - margin.left - margin.right;
   

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin


// format and parse the data
let parseTime = d3.timeParse('%d-%b-%y');
let formatTime = d3.timeFormat('%d/%b/%y')


// Get the data
d3.csv("data.csv").then(function(data) {
  // format the data
  data.forEach(d => {
      d.date = parseTime(d.date);
      d.close = +d.close;
  });

// ---------- Scales and Ranges

const xValue = d => d.date;
const yValue = d => d.close

const xScale = d3.scaleTime() 
  .domain(d3.extent(data, xValue))
  .range([0, chartWidth]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, yValue)])
  .range([chartHeight, 0])

// set the ranges
// let x = d3.scaleTime().range([0, chartWidth]);
// let y = d3.scaleLinear().range([chartHeight, 0]);


  // Scale the range of the data
  // x.domain(d3.extent(data, d =>  d.date));
  // y.domain([0, d3.max(data, d => d.close)]);

//------- Start drawing the Chart

const g = svg.append('g')
    .attr('transform', `translate(${margin.left }, ${margin.top})`);


  // define the line
let valueline = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)));

  // Add the valueline path.
  g.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  g.append("g")
      .attr("transform", "translate(0," + chartHeight + ")")
      .call(d3.axisBottom(xScale)
        .tickFormat(formatTime));

  // Add the Y Axis
  g.append("g")
      .call(d3.axisLeft(yScale));


});