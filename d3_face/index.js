// import {select} from 'd3';
// const svg = select('svg')

const svg = d3.select('svg')
const height = +svg.attr('height');
const width = +svg.attr('width');

eyeRadius = 30;
eyebrowWidth = 70; 
eyebrowHeight = 15; 
eyebrowYOffset = -70;

const g = svg.append('g')
  .attr('transform', `translate(${width/2}, ${height/2})`);

const circle = g.append('circle')
  .attr('r', height / 2)
  // .attr('cy', height / 2)
  // .attr('cx', width / 2)
  .attr('fill', 'yellow')
  .attr('stroke', 'black')

const eyesG = g.append('g')
  .attr('transform', `translate(0, ${-70})` )

const leftEye = eyesG.append('circle')
  .attr('r', eyeRadius)
  .attr('cx', -100)
  .attr('fill', 'black');

const rightEye = eyesG.append('circle')
  .attr('r', eyeRadius)
  .attr('cx', 100)
  .attr('fill', 'black');

const leftEyebrow = eyesG.append('rect')
  .attr('x', -100 - eyebrowWidth /2)
  .attr('y', eyebrowYOffset)
  .attr('width', eyebrowWidth)
  .attr('height', eyebrowHeight)

const rightEyebrow = eyesG.append('rect')
  .attr('x', 100 - eyebrowWidth /2)
  .attr('y', eyebrowYOffset)
  .attr('width', eyebrowWidth)
  .attr('height', eyebrowHeight)

const mouth = g.append('path')
  .attr('d', d3.arc()({
    innerRadius: 0,
    outerRadius: 170,
    startAngle: Math.PI / 2,
    endAngle: Math.PI * 3 /2
  }))
