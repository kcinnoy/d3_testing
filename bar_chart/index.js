// import {select} from 'd3';
// const svg = select('svg')

const svg = d3.select('svg')
const height = +svg.attr('height');
const width = +svg.attr('width');

const render = data => {
  
}

d3.csv('data.csv').then(data => {
  data.forEach( d => {
    d.population = +d.population;
  });
  console.log(data);
});