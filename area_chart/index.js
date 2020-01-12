
const svg = d3.select('svg')
const height = +svg.attr('height');
const width = +svg.attr('width');

const render = data => {

  const margin = {top: 60, right: 40, bottom: 70, left: 100};
  const innerHeight = height - (margin.top + margin.bottom);
  const innerWidth = width - (margin.left + margin.right);
  
  const title = 'Cars: Horsepower vs. Cylinders'
  const circleRadius = 10;

  const xValue = d => d.timestamp;
  const xLabel = 'Time';

  const yValue = d => d.temperature;
  const yLabel = 'Temperature';


  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0,innerWidth]);
   
  
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight,0])
    .nice();;


  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxis = d3.axisBottom(xScale)
    .ticks(6)
    .tickSize(-innerHeight)
    .tickPadding(15);

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(15);

  const yAxisG = g.append('g').call(yAxis);
    
  // yAxisG.selectAll('.domain').remove();
  
  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -60)
    .attr('x', -innerHeight / 2)
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle') 
    .text(yLabel);
         
  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);
    
  // xAxisG.select('.domain').remove();
  
  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', 60)
    .attr('x', innerWidth / 2)
    .attr('fill', 'black')
    .text(xLabel)
  
  const areaGenerator = d3.area()
    .x(d => xScale(xValue(d)))
    .y0(innerHeight)
    .y1(d => yScale(yValue(d)))
    .curve(d3.curveBasis);
  
    g.append('path')
      .attr('class', 'line-path')
      .attr('d', areaGenerator(data));


  g.append('text')
    .attr('class', 'title')
    .attr('y', -10)
    .text(title)
};

d3.csv('data.csv')
  .then(data => {
    console.log(data);
  data.forEach( d => {
    d.temperature = +d.temperature;
    d.timestamp = new Date(d.timestamp);
  });
  render(data);
});