// Lab 4 Step 1.4
import { fetchJSON, renderProjects } from '../global.js';

// Lab 5 Step 1.3
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// Color Scale
let colors = d3.scaleOrdinal(d3.schemeTableau10); // Lab 5 Step 1.5

// Lab 5 Step 5.2.1
let selectedIndex = -1;

// Fetch project data and render project list
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

// Lab 5 Step 4.2
let query = '';
const searchInput = document.querySelector('.searchBar');

searchInput.addEventListener('input', (event) => {
  query = event.target.value.toLowerCase(); // Case-insensitive search
  
  // Filter projects based on search query
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join(' ').toLowerCase();
    return values.includes(query);
  });

  // Re-render the filtered project list
  renderProjects(filteredProjects, projectsContainer, 'h2');

  // Re-render the pie chart and legend with filtered projects
  renderPieChart(filteredProjects);
});

// Lab 5 Step 4.3
function renderPieChart(projectsGiven) {
    // Clear existing paths and legend before re-rendering
    d3.select('#projects-plot').selectAll('path').remove();
    d3.select('.legend').selectAll('li').remove();

    // Group projects by year
    let rolledData = d3.rollups(
        projectsGiven,
        (v) => v.length,
        (d) => d.year
    );

    // Convert to { value, label } format
    let data = rolledData.map(([year, count]) => {
        return { value: count, label: year };
    });

    // Generate pie chart slices
    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcData = sliceGenerator(data);

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    // Draw the pie chart slices
    d3.select('#projects-plot')
        .selectAll('path')
        .data(arcData)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', (d, idx) => colors(idx))
        // Lab 5 Step 5.2.2
        .attr('class', (d, idx) => idx === selectedIndex ? 'selected' : '') // Highlight if selected
        .on('click', function (event, d) {
            selectedIndex = selectedIndex === d.index ? -1 : d.index;
            updateSelection(data); // Update only the highlighting, no data filtering
        });

    // Generate legend items
    let legend = d3.select('.legend');
    data.forEach((d, idx) => {
        legend.append('li')
            .attr('style', `--color:${colors(idx)}`)
            .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`)
            .attr('class', idx === selectedIndex ? 'selected' : '')
            .on('click', () => {
                selectedIndex = selectedIndex === idx ? -1 : idx;

                // Re-render the UI
                updateSelection(data);
            
            });
    });
}

// Lab 5 Step 4.4 - Initial render
renderPieChart(projects);

// Function to handle re-rendering of projects and pie chart based on selection
function updateSelection(data) {
    // Filter projects based on selection
    const year = selectedIndex === -1 ? null : data[selectedIndex].label;
    filterProjectsByYear(year);

    // Re-render the pie chart and legend to reflect selection state
    d3.select('#projects-plot')
        .selectAll('path')
        .attr('class', (d, idx) => idx === selectedIndex ? 'selected' : '');

    d3.select('.legend')
        .selectAll('li')
        .attr('class', (d, idx) => idx === selectedIndex ? 'selected' : '');
}

// Lab 5 Step 5.3
function filterProjectsByYear(year) {
    let filteredProjects = year 
        ? projects.filter((project) => project.year === year) 
        : projects;

    // Re-render project list and pie chart
    renderProjects(filteredProjects, projectsContainer, 'h2');
    renderPieChart(filteredProjects);
}

// Initial render of the pie chart and project list
renderProjects(projects, projectsContainer, 'h2');
renderPieChart(projects);


// // Lab 5 Step 3.1
// let rolledData = d3.rollups(
//     projects,
//     (v) => v.length,   // Count projects per year
//     (d) => d.year      // Group by the project year
// );

// // Convert to an array of objects with `value` and `label`
// let data = rolledData.map(([year, count]) => {
// return { value: count, label: year };
// });  

// // Lab 5 Step 2.1 - Generate pie slices
// let sliceGenerator = d3.pie().value((d) => d.value);
// let arcData = sliceGenerator(data);

// // Arc generator for drawing slices
// let arcGenerator = d3.arc().innerRadius(0).outerRadius(50); // Lab 5 Step 1.3

// // Draw pie chart slices
// d3.select('#projects-plot')
//   .selectAll('path')
//   .data(arcData)
//   .enter()
//   .append('path')
//   .attr('d', arcGenerator)
//   .attr('fill', (d, idx) => colors(idx));

// // Lab 5 Step 3.3
// let legend = d3.select('.legend');

// // Clear the legend (in case of re-rendering)
// legend.selectAll('*').remove();

// // Generate legend items based on dynamic data
// data.forEach((d, idx) => {
// legend.append('li')
//     .attr('style', `--color:${colors(idx)}`)
//     .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
// });


  




  


