// import {select} from 'd3';
// const svg = select('svg')

const svg = d3.select('svg')
const height = +svg.attr('height');
const width = +svg.attr('width');

const render = data => {

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.population)])
    .range([0,width]);
  
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.country))
    .range([0, height]);

  console.log(yScale.domain())

  svg.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('y', d => yScale(d.country))
      .attr('width', d => xScale(d.population))
      .attr('height', yScale.bandwidth());
};

d3.csv('data.csv').then(data => {
  data.forEach( d => {
    d.population = +d.population;
  });
  render(data);
});