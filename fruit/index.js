const svg = d3.select('svg')

const height = +svg.attr('height');
const width = +svg.attr('width');

const render = (selection, {fruits}) => {
  selection.selectAll('circle').data(fruits)
    .enter().append('circle')
      .attr('cx', (d, i) => i * 120 + 60)
      .attr('cy', height / 2)
      .attr('r', 50)
      .attr('fill', '#d42313');

  selection.selectAll('circle').data(fruits)
    .exit().remove();
}

const makeFruit = type =>({type});
const fruits = d3.range(5).map(() => makeFruit('apple'));


render(svg, {fruits});

setTimeout(() => {
  fruits.pop();
  render(svg, {fruits});
}, 1000);




