// import {select} from 'd3';
// const svg = select('svg')

const svg = d3.select('svg')
const height = +svg.attr('height');
const width = +svg.attr('width');

const circle = svg.append('circle')
  .attr('r', height / 2)
  .attr('cy', height / 2)
  .attr('cx', width / 2)
  .attr('fill', 'yellow')
  .attr('stroke', 'black')

const leftEye = svg.append('circle')
  .attr('r', 10)
  .attr('cy', height / 2)
  .attr('cx', width / 2)
  .attr('fill', 'black')
