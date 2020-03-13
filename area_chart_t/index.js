// set the dimensions and margins of the graph

const chartSize = document.querySelector('.lineChart');

const height = parseInt(getComputedStyle(chartSize).height);
const width = parseInt(getComputedStyle(chartSize).width);

const svg = d3.select('#lineChart-1')

const margin = {top: 40, right: 20, bottom: 50, left: 50},
    chartHeight = height - margin.top - margin.bottom,
    chartWidth = width - margin.left - margin.right;

const xLabel = 'Time of Close';
const yLabel = 'Value';
const title = 'Line Chart Example';

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

  let xGridline = () => {return d3.axisBottom(xScale).ticks()};
  let yGridline = () => {return d3.axisLeft(yScale).ticks(5)};

  //define x gridlines 

  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(${margin.left}, ${chartHeight+margin.top})`)
    .call(xGridline()
      .tickSize(-chartHeight)
      .tickFormat("")
    )

  //define y gridlines 

  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yGridline()
      .tickSize(-chartWidth)
      .tickFormat("")
    )
  
  // define the area 
  let valueArea = d3.area()
    .x(d => xScale(xValue(d)))
    .y0(chartHeight)
    .y1(d => yScale(yValue(d)))

  // define the line
  let valueline = d3.line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)));


  g.append("path")
    .data([data])
    .attr("class", "area")
    .attr("d", valueArea);

  //Add the valueline path.
  g.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);


  // Add the X Axis
  g.append("g")
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale)
        .tickFormat(formatTime));

  // Add the Y Axis
  g.append("g")
      .call(d3.axisLeft(yScale));

  // Add X label 

  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height)
    .attr('dy', '-0.5em')
    .attr('class', 'title')
    .attr('text-anchor', 'middle')
    .text(xLabel)

    // Add Y label 

  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '-2em')
    .attr('text-anchor', 'middle')
    .text(yLabel)

  // Title
    
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', margin.top / 2)
    .attr('text-anchor', 'middle')
    .text(title)
      
});