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

  const bowl = selection.selectAll('rect')
    .data([null])
    .enter().append('rect')
      .attr('y', 20)
      .attr('width', 920)
      .attr('height', 350)
      .attr('rx', 300/2)
      .attr('fill', '#e5ddbc');

  const groups = selection.selectAll('g').data(fruits, d => d.id);
  const groupsEnter = groups.enter().append('g'); 
    groupsEnter.merge(groups)
      .attr('transform', (d,i) => 
        `translate(${i * 120 + 60}, ${height / 4})`);  
  groups.exit().remove();


  groupsEnter.append('circle') 
    .merge(groups.select('circle'))
      .attr('fill', d => colorScale(d.type))
      .on('click', d => {
        console.log(d.id);
      })
    .transition().duration(1500)
      .attr('cx', xPosition)
      .attr('r', d => radiusScale(d.type))  
      
  groupsEnter.append('text') 
    .merge(groups.select('text'))
      .text(d => d.type)
    .transition().duration(1500)
      .attr('x', xPosition)
      .attr('y', 120)
}

const makeFruit = type =>({
  type,
  id: Math.random()
});

let fruits = d3.range(5).map(() => makeFruit('apple'));

let selectedFruit = null;

const onClick = id => {
  selectedFruit = id;
  render()
}

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




