// import {select} from 'd3';
// const svg = select('svg')

const svg = d3.select('svg')
const height = +svg.attr('height');
const width = +svg.attr('width');

const g = svg.append('g')
  .attr('transform', `translate(${width/2}, ${height/2})`);

const circle = g.append('circle')
  .attr('r', height / 2)
  // .attr('cy', height / 2)
  // .attr('cx', width / 2)
  .attr('fill', 'yellow')
  .attr('stroke', 'black')

const leftEye = g.append('circle')
  .attr('r', 30)
  .attr('cy', -70)
  .attr('cx', -100)
  .attr('fill', 'black');

const rightEye = g.append('circle')
  .attr('r', 30)
  .attr('cy', -70)
  .attr('cx', 100)
  .attr('fill', 'black');

const mouth = g.append('path')
  .attr('d', d3.arc()({
    innerRadius: 0,
    outerRadius: 170,
    startAngle: Math.PI / 2,
    endAngle: Math.PI * 3 /2
  }))
