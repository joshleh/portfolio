// Lab 4 Step 1.4
import { fetchJSON, renderProjects } from '../global.js';

// Lab 5 Step 1.3
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// Fetch project data and render project list
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

// Lab 5 Step 3.1
let rolledData = d3.rollups(
    projects,
    (v) => v.length,   // Count projects per year
    (d) => d.year      // Group by the project year
);

// Convert to an array of objects with `value` and `label`
let data = rolledData.map(([year, count]) => {
return { value: count, label: year };
});  

// Color Scale
let colors = d3.scaleOrdinal(d3.schemeTableau10); // Lab 5 Step 1.5

// Lab 5 Step 2.1 - Generate pie slices
let sliceGenerator = d3.pie().value((d) => d.value);
let arcData = sliceGenerator(data);

// Arc generator for drawing slices
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50); // Lab 5 Step 1.3

// Draw pie chart slices
d3.select('#projects-plot')
  .selectAll('path')
  .data(arcData)
  .enter()
  .append('path')
  .attr('d', arcGenerator)
  .attr('fill', (d, idx) => colors(idx));

// Lab 5 Step 3.3
let legend = d3.select('.legend');

// Clear the legend (in case of re-rendering)
legend.selectAll('*').remove();

// Generate legend items based on dynamic data
data.forEach((d, idx) => {
legend.append('li')
    .attr('style', `--color:${colors(idx)}`)
    .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
});
  

  


