// import {select} from 'd3';
// const svg = select('svg')

const svg = d3.select('svg')
const height = +svg.attr('height');
const width = +svg.attr('width');

const render = data => {

  const margin = {top: 40, right: 40, bottom: 70, left: 100};
  const innerHeight = height - (margin.top + margin.bottom);
  const innerWidth = width - (margin.left + margin.right);
  const xValue = d => d.cylinders;
  const yValue = d => d.horsepower;


  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0,innerWidth])
    .nice();
  
  const yScale = d3.scalePoint()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.7);

  // const yAxis = d3.axisLeft(yScale);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // yAxis(g.append('g'));

  const xAxisFormat = number => {
   return d3.format('.2s')(number)
      .replace('G','B');
  }

  const xAxis = d3.axisBottom(xScale)
    .tickFormat(xAxisFormat)
    .tickSize(-innerHeight);

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)

  g.append('g')
    .call(yAxis)
    .selectAll('.domain')
      .remove();

  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);
    
  xAxisG.select('.domain').remove();
  
  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', 60)
    .attr('x', innerWidth / 2)
    .attr('fill', 'black')
    .text('Population')
    

  g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', 10);

  g.append('text')
    .attr('class', 'title')
    .attr('y', -10)
    .text('Top 10 most populous countries')
};



d3.csv('https://vizhub.com/datasets/curran/auto-mpg.csv')
  .then(data => {
  data.forEach( d => {
    d.mpg = +d.mpg;
    d.cylinders = +d.cylinders;
    d.displacement = +d.displacement;
    d.horsepower = +d.horsepower;
    d.weight = +d.weight;
    d.acceleration = +d.acceleration;
    d.year = +d.year;
  });
  render(data);
});