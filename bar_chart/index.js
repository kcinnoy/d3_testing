// import {select} from 'd3';
// const svg = select('svg')

const svg = d3.select('svg')
const height = +svg.attr('height');
const width = +svg.attr('width');

const render = data => {

  const margin = {top: 40, right: 40, bottom: 70, left: 100};
  const innerHeight = height - (margin.top + margin.bottom);
  const innerWidth = width - (margin.left + margin.right);
  const xValue = d => d.population;
  const yValue = d => d.country;


  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0,innerWidth]);
  
  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);

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

  g.append('g').call(d3.axisLeft(yScale))
    .selectAll('.domain, .tick line')
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
    

  g.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth());

  g.append('text')
    .attr('class', 'title')
    .attr('y', -10)
    .text('Top 10 most populous countries')
};



d3.csv('data.csv').then(data => {
  data.forEach( d => {
    d.population = +d.population;
  });
  render(data);
});