// Lab 4 Step 1.4
import { fetchJSON, renderProjects } from '../global.js';

// Lab 5 Step 1.3
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// 
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

// Lab 5 Step 1.3
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

let arc = arcGenerator({
  startAngle: 0,
  endAngle: 2 * Math.PI,
});

// Append the path to the SVG
d3.select('#projects-plot')
  .append('path')
  .attr('d', arc)
  .attr('fill', 'red');

// Lab 5 Step 1.4

let data = [1, 2, 3, 4, 5, 5];  // Lab 5 Step 1.5

let total = data.reduce((acc, val) => acc + val, 0);
let angle = 0;
let arcData = [];

data.forEach(d => {
  let endAngle = angle + (d / total) * 2 * Math.PI;
  arcData.push({ startAngle: angle, endAngle });
  angle = endAngle;
});

let arcs = arcData.map(d => arcGenerator(d));

let colors = d3.scaleOrdinal(d3.schemeTableau10); // Lab 5 Step 1.5

// Lab 5 Step 1.5
arcs.forEach((arc, idx) => {
    d3.select('#projects-plot')
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(idx));  // Use dynamic colors
  });
  


