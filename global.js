console.log('IT’S ALIVE!');

// function $$(selector, context = document) {
//   return Array.from(context.querySelectorAll(selector));
// }

// // Step 2.1: Get an array of all nav links
// const navLinks = $$("nav a");

// // Step 2.2: Find the link to the current page
// const currentLink = navLinks.find(
//   (a) => a.host === location.host && a.pathname === location.pathname
// );

// // Step 2.3: Add the `current` class to the current page link
// currentLink?.classList.add('current');

let pages = [
    { url: 'index.html', title: 'Home' },
    { url: 'projects/index.html', title: 'Projects' },
    { url: 'contact/index.html', title: 'Contact' },
    { url: 'resume/index.html', title: 'Resume' },
    { url: 'https://github.com/joshleh', title: 'GitHub Profile' },
    { url: 'https://www.linkedin.com/in/joshleh/', title: 'LinkedIn Profile' },
];

const ARE_WE_HOME = document.documentElement.classList.contains('home');
let nav = document.createElement('nav');
document.body.prepend(nav);

// Normalize paths to ensure matching works
function normalizePath(path) {
    if (path.endsWith('/')) {
        return path + 'index.html';
    }
    return path;
}

for (let p of pages) {
    let url = p.url;
    let title = p.title;

    // Adjust relative URLs for pages not on the home page
    if (!ARE_WE_HOME && !url.startsWith('http')) {
        url = '../' + url;
    }

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    // Debugging: Log the URLs being processed
    console.log('Processing link:', a.href);
    console.log('Current page location:', location.href);
    console.log(
        'Does it match?',
        normalizePath(a.pathname) === normalizePath(location.pathname)
    );

    // Highlight the current page
    a.classList.toggle(
        'current',
        normalizePath(a.pathname) === normalizePath(location.pathname)
    );

    // Open external links in a new tab
    if (a.host !== location.host) {
        a.target = '_blank';
    }

    nav.append(a);
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
        Theme:
        <select>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>
    `
);

// Get the select element
const select = document.querySelector('.color-scheme select');

// Function to set the color scheme
function setColorScheme(scheme) {
    document.documentElement.style.setProperty('color-scheme', scheme);
    localStorage.colorScheme = scheme; // Save preference
    select.value = scheme; // Update the dropdown
}

// Event listener for user input
select.addEventListener('input', (event) => {
    setColorScheme(event.target.value);
});

// Load and apply saved preference on page load
if ('colorScheme' in localStorage) {
    setColorScheme(localStorage.colorScheme);
} else {
    setColorScheme('light dark'); // Default to Automatic
}

// Lab 4 Step 1.2
export async function fetchJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
}

// Lab 4 Step 1.3
export function renderProjects(project, containerElement, headingLevel = 'h2') {
    containerElement.innerHTML = '';  // Clear the container
  
    project.forEach(proj => {
      const article = document.createElement('article');
      article.innerHTML = `
        <${headingLevel}>${proj.title}</${headingLevel}>
        <img src="${proj.image}" alt="${proj.title}">
        <p>${proj.description}</p>
        <p class="project-year">c. ${project.year}</p>
      `;
      containerElement.appendChild(article);
    });
}

// Lab 4 Step 3.2
export async function fetchGitHubData(username) {
    return fetchJSON(`https://api.github.com/users/${username}`);
  }
  
  


  




