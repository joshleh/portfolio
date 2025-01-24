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
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'resume/', title: 'Resume' },
    { url: 'https://github.com/joshleh', title: 'GitHub Profile' },
    { url: 'https://www.linkedin.com/in/joshleh/', title: 'LinkedIn Profile' },
];

const ARE_WE_HOME = document.documentElement.classList.contains('home');
let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;

    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    a.classList.toggle(
        'current',
        a.host === location.host && a.pathname === location.pathname
    );

    if (a.host !== location.host) {
        a.target = '_blank';
    }

    nav.append(a);
}



