const svg = d3.select('svg')

const height = +svg.attr('height');
const width = +svg.attr('width');

const makeFruit = type =>({type});

const fruits = d3.range(5).map(() => makeFruit('apple'));
