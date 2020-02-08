const svg = d3.select('svg')

const height = +svg.attr('height');
const width = +svg.attr('width');

const colorScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon'])
  .range(['#c11d1d', 'yellow']);
  
const radiusScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon'])
  .range([50, 30]);

const xPosition = (d, i) => i * 120 + 60

const render = (selection, {fruits}) => {

  const groups = selection.selectAll('g').data(fruits, d => d.id);
  const groupsEnter = groups.enter().append('g'); 
    groupsEnter.merge(groups)
      .attr('transform', (d,i) => 
        `translate(${i * 120 + 60}, ${height / 4})`);  
  groups.exit().remove();


      groupsEnter.append('circle') 
          .attr('r', 0)
        .merge(groups.select('circle'))
          .attr('fill', d => colorScale(d.type))
        .transition().duration(1500)
          .attr('cx', xPosition)
          .attr('r', d => radiusScale(d.type))   
        .transition().duration(1000)
          .attr('r', 0)
        .remove();
}

const makeFruit = type =>({
  type,
  id: Math.random()
});

let fruits = d3.range(5).map(() => makeFruit('apple'));

render(svg, {fruits});

setTimeout(() => {
  fruits.pop();
  render(svg, {fruits});
}, 1000);

setTimeout(() => {
  fruits[2].type = 'lemon';
  render(svg, {fruits});
}, 2000);

setTimeout(() => {
  fruits = fruits.filter((d,i) => i !== 1)
  render(svg, {fruits});
}, 3000);




