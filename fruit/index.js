const svg = d3.select('svg')

const height = +svg.attr('height');
const width = +svg.attr('width');

const makeFruit = type =>({type});

const fruits = d3.range(5).map(() => makeFruit('apple'));

svg.selectAll('circle').data(fruits)
  .enter().append('circle')
    .attr('cx', (d, i) => i * 100)
    .attr('cy', height / 2)
    .attr('r', 50);
