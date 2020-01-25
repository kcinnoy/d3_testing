
const svg = d3.select('svg')
const height = +svg.attr('height');
const width = +svg.attr('width');

const render = data => {

  const margin = {top: 60, right: 40, bottom: 70, left: 100};
  const innerHeight = height - (margin.top + margin.bottom);
  const innerWidth = width - (margin.left + margin.right);
  
  const title = 'World Poulation'
  const circleRadius = 10;

  const xValue = d => d.year;
  const xLabel = 'Year';

  const yValue = d => d.population;
  const yLabel = 'Population';


  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0,innerWidth]);
   
  
  const yScale = d3.scaleLinear()
    .domain([0,d3.max(data, yValue)])
    .range([innerHeight,0])
    .nice();;

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    
  const areaGenerator = d3.area()
  .x(d => xScale(xValue(d)))
  .y0(innerHeight)
  .y1(d => yScale(yValue(d)))
  .curve(d3.curveBasis);
  
  g.append('path')
    .attr('class', 'line-path')
    .attr('d', areaGenerator(data));
  
  const xAxis = d3.axisBottom(xScale)
  .ticks(6)
  .tickSize(-innerHeight)
  .tickPadding(15);

  const yAxisTickFormat = number => 
  d3.format('.1s')(number)
    .replace('G','B');

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(15)
    .tickFormat(yAxisTickFormat);

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

  svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', 50)
    .text(title)
};

d3.csv('data.csv')
  .then(data => {
  data.forEach( d => {
    d.population = +d.population;
    d.year = new Date(d.year);
  });
  render(data);
});