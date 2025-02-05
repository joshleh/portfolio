// Lab 4 Step 1.4
import { fetchJSON, renderProjects } from '../global.js';

// Lab 5 Step 1.3
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// Fetch project data and render project list
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

// let arc = arcGenerator({
//   startAngle: 0,
//   endAngle: 2 * Math.PI,
// });

// // Append the path to the SVG
// d3.select('#projects-plot')
//   .append('path')
//   .attr('d', arc)
//   .attr('fill', 'red');

// Lab 5 Step 1.4

    // Lab 5 Step 1.5 -> 2.1
let data = [
    { value: 1, label: 'Apples' },
    { value: 2, label: 'Oranges' },
    { value: 3, label: 'Mangos' },
    { value: 4, label: 'Pears' },
    { value: 5, label: 'Limes' },
    { value: 5, label: 'Cherries' }
];  

// Color Scale
let colors = d3.scaleOrdinal(d3.schemeTableau10); // Lab 5 Step 1.5

// Lab 5 Step 2.1 - Generate pie slices
let sliceGenerator = d3.pie().value((d) => d.value);
let arcData = sliceGenerator(data);

// Arc generator for drawing slices
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50); // Lab 5 Step 1.3


// arcData.forEach((d, idx) => {
//     d3.select('#projects-plot')
//       .append('path')
//       .attr('d', arcGenerator(d))
//       .attr('fill', colors(idx));
// });

// Draw pie chart slices
d3.select('#projects-plot')
  .selectAll('path')
  .data(arcData)
  .enter()
  .append('path')
  .attr('d', arcGenerator)
  .attr('fill', (d, idx) => colors(idx));

// Lab 5 Step 2.2 - Generate legend items
let legend = d3.select('.legend');
data.forEach((d, idx) => {
  legend.append('li')
    .attr('style', `--color:${colors(idx)}`)
    .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
});

  


